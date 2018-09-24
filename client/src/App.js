import React, { Component } from "react";
import logo from "./logo.svg";

import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
  Popup,
  Form,
  Checkbox,
  TextArea,
  Message,
  Card,
  Transition
} from "semantic-ui-react";

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from "semantic-ui-calendar-react";

import DropzoneComponent from "react-dropzone-component";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ActionCable } from "react-actioncable-provider";

const JSON_HEADERS = {
  "Content-Type": "application/json"
};

// const FORM_DATA_HEADERS = {
//   Accept: "application/json",
//   "Content-Type": "multipart/form-data"
// };

const ErrorMessage = props => {
  if (props.errorMessage.length > 0) {
    const merged_messages = props.errorMessage.map(item => (
      <Message.Item>{item}</Message.Item>
    ));

    return (
      <Message error>
        <Message.Header>Ops!</Message.Header>
        <Message.List>{merged_messages}</Message.List>
      </Message>
    );
  }
};

const FSCard = props => (
  <Card link fluid>
    <Image src={props.pictures[0]} />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>
        <span className="date">{props.address1 || props.address2}</span>
      </Card.Meta>
      <Card.Description>{props.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name="eye" />
        {Math.floor(Math.random() * 100)} People watching
      </a>
    </Card.Content>
  </Card>
);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      posts: [],
      sidebarOpened: true,
      uploadFormOpen: false,
      form: {
        id: 0,
        title: "",
        datetime: "",
        description: "",
        address: "",
        neighborhood: "",
        number: "",
        city: "",
        state: "",
        terms: true
      },
      form_errors: {
        titleError: false,
        datetimeError: false,
        descriptionError: false,
        addressError: false,
        neighborhoodError: false,
        cityError: false,
        stateError: false,
        dropzoneError: false
      },
      form_settings: {},
      errorMessage: [""],
      isFormOnError: false
    };
  }

  componentDidMount() {
    //DropzoneComponent setting
    this.dropzoneConfig = {
      iconFiletypes: [".jpg", ".png", ".gif"],
      showFiletypeIcon: true,
      postUrl: `/api/attach_picture`
    };
    //DropzoneComponent setting
    this.djsConfig = {
      addRemoveLinks: true,
      autoProcessQueue: true,
      dictCancelUpload: "",
      dictRemoveFile: "Remove",
      dictDefaultMessage: "Click or drop pictures here!",
      maxFiles: 3,
      params: () => ({
        id: this.state.form.id
      })
    };
    //DropzoneComponent setting
    this.eventHandlers = {
      init: dropzone => {
        this.dropzone = dropzone; //ref
      },
      removedfile: file => {
        console.log("removed file", file);
        if (!this.state.submitted) {
          window
            .fetch(`/api/posts/${this.state.form.id}`, {
              method: "DELETE",
              headers: JSON_HEADERS,
              body: JSON.stringify({
                attachment_id: file.xhr
                  ? JSON.parse(file.xhr.response)[0].id
                  : ""
              })
            })
            .then(res => {
              console.log("Delete response", res);
              if (res.status == 200) return res.json();
              else return res.text();
            })
            .then(text => console.log("Was not deleted", text));
        }
      },
      addedfile: file => {
        if (this.dropzone.files[3] != null) {
          this.dropzone.removeFile(this.dropzone.files[3]);
          toast("Please, select up to 3 pictures.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
          });
        }
        this.setState({ submitted: false, queueComplete: false });
      },
      queuecomplete: () => {
        toast("Yes! All uploads are done!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
        this.setState({ queueComplete: true });
      }
    };

    //Get all posts
    window
      .fetch("/api/posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts }))
      .catch(error => console.log(error));

    this.handleTemporaryPost();
  }

  handleTemporaryPost = () => {
    window
      .fetch("/api/posts", {
        method: "POST",
        headers: JSON_HEADERS,
        body: JSON.stringify({
          post_type: "",
          title: "",
          description: "",
          date: new Date(),
          address1: "",
          address2: "",
          number: "",
          city: "",
          state: "",
          issue_type: "",
          maps_marker: ""
        })
      })
      .then(res => {
        if (res.status == 201) return res.json();
        else return {};
      })
      .then(post => {
        //console.log("Temporary Post", post);
        this.setState({
          form: {
            ...post,
            //remapping attributes to match expected state
            datetime: moment(post.date).format("DD-MM-YYYY HH:mm"),
            address: post.address1,
            neighborhood: post.address2,
            terms: true
          }
        });
      });

    this.setState({ uploadFormOpen: true });
  };

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;
    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ form: { ...this.state.form, [name]: value } });
  };

  handleDateChange = (event, { name, value }) => {
    if (this.state.form.hasOwnProperty(name)) {
      this.setState({ form: { ...this.state.form, [name]: value } });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    let errorMessage = [];

    let titleError = false;
    let descriptionError = false;
    let dropzoneError = false;

    if (this.state.form.title.length < 7) {
      errorMessage.push("Title needs to have more than 7 characters.");
      titleError = true;
    } else {
      titleError = false;
    }

    if (this.state.form.description.length < 7) {
      errorMessage.push("Description needs to have more than 7 characters.");
      descriptionError = true;
    } else {
      descriptionError = false;
    }

    if (!this.dropzone.files.length) {
      errorMessage.push("Please, add some picture.");
      toast("Please, add some picture.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      dropzoneError = true;
    }

    let isFormOnError = titleError || descriptionError || dropzoneError;
    let form_errors = {
      ...this.state.form_errors,
      titleError,
      descriptionError,
      dropzoneError
    };
    this.setState({ isFormOnError, form_errors, errorMessage });

    if (!isFormOnError) {
      window
        .fetch(`/api/posts/${this.state.form.id}`, {
          method: "PUT",
          headers: JSON_HEADERS,
          body: JSON.stringify({
            post_type: "picture",
            title: this.state.form.title,
            description: this.state.form.description,
            date: this.state.form.datetime,
            address1: this.state.form.address,
            address2: this.state.form.neighborhood,
            number: this.state.form.number,
            city: this.state.form.city,
            state: this.state.form.state,
            issue_type: "",
            maps_marker: "",
            issue_solved: false
          })
        })
        .then(res => {
          console.log("PUT Response", res);
          if (res.status == 200) {
            toast("🦄 Thanks!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true
            });
            this.setState({ submitted: true }, () => {
              this.dropzone.removeAllFiles();
              this.handleTemporaryPost();
            });

            return;
          } else return res.text();
        })
        .then(post => {
          //console.log("Permanent Post", post);
        });
    }
  };

  handleReceivedPost = response => {
    console.log("Received post", response);
    this.setState({
      posts: [response.json, ...this.state.posts]
    });

    toast("Awesome! List's been updated 🚀", {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive>
        <ActionCable
          channel={{ channel: "PostsChannel" }}
          onReceived={this.handleReceivedPost}
        />
      <Menu fixed='top' pointing>
          <Menu.Item>
            <Icon name="recycle" /> Formiga Social
          </Menu.Item>
          <Menu.Item position="right">
            <Popup
              open={this.state.uploadFormOpen}
              flowing
              on="click"
              trigger={
                <Button
                  onClick={() =>
                    this.setState({
                      uploadFormOpen: !this.state.uploadFormOpen
                    })
                  }
                >
                  <Icon name="cloud upload" />Upload
                </Button>
              }
            >
              <Popup.Header>Upload new picture</Popup.Header>
              <Popup.Content>
                <Form onSubmit={event => this.handleSubmit(event)}>
                  <Form.Input
                    label="Title"
                    name="title"
                    placeholder="Write one title for picture"
                    value={this.state.form.title}
                    onChange={this.handleInputChange}
                    error={this.state.form_errors.titleError}
                    required
                  />

                  <Form.Field
                    required
                    error={this.state.form_errors.dropzoneError}
                  >
                    <label>Picture</label>
                    <DropzoneComponent
                      className="dropzone"
                      config={this.dropzoneConfig}
                      eventHandlers={this.eventHandlers}
                      djsConfig={this.djsConfig}
                    />
                  </Form.Field>

                  <Form.Group widths="equal">
                    <Button type="button" disabled icon labelPosition="right">
                      <Icon name="camera retro" />
                      Open camera
                    </Button>
                    <Button
                      fluid
                      onClick={() => this.dropzone.hiddenFileInput.click()}
                      icon
                      labelPosition="right"
                      type="button"
                    >
                      Choose from computer
                      <Icon name="file image" />
                    </Button>
                  </Form.Group>

                  <Form.Field
                    id="form-textarea-control-description"
                    name="description"
                    control={TextArea}
                    label="Description"
                    placeholder="Explain the issue on the picture"
                    value={this.state.form.description}
                    onChange={this.handleInputChange}
                    error={this.state.form_errors.descriptionError}
                    required
                  />
                  <Form.Field required>
                    <label>Date</label>
                    <DateTimeInput
                      readOnly
                      name="datetime"
                      placeholder="Date of the picture"
                      value={this.state.form.datetime}
                      iconPosition="left"
                      onChange={this.handleDateChange}
                    />
                  </Form.Field>

                  <Form.Group>
                    <Form.Input
                      label="Street/Avenue"
                      placeholder="Paulista Avenue"
                      width={10}
                      name="address"
                      value={this.state.form.address}
                      onChange={this.handleInputChange}
                      error={this.state.form_errors.addressError}
                      required
                    />
                    <Form.Input
                      label="Number"
                      placeholder="1234"
                      name="number"
                      width={6}
                      value={this.state.form.number}
                      onChange={this.handleInputChange}
                      error={this.state.form_errors.numberError}
                    />
                  </Form.Group>

                  <Form.Input
                    label="Neighborhood"
                    placeholder="Jd. Paulista"
                    name="neighborhood"
                    value={this.state.form.neighborhood}
                    onChange={this.handleInputChange}
                    error={this.state.form_errors.neighborhoodError}
                    required
                  />

                  <Form.Group widths="equal">
                    <Form.Input
                      label="City"
                      placeholder="São Paulo"
                      name="city"
                      value={this.state.form.city}
                      onChange={this.handleInputChange}
                      error={this.state.form_errors.cityError}
                      required
                    />
                    <Form.Input
                      label="State"
                      placeholder="São Paulo"
                      name="state"
                      value={this.state.form.state}
                      onChange={this.handleInputChange}
                      error={this.state.form_errors.stateError}
                      required
                    />
                  </Form.Group>

                  <Form.Checkbox
                    name="terms"
                    toggle
                    checked={this.state.form.terms}
                    onChange={() =>
                      this.setState({
                        form: {
                          ...this.state.form,
                          terms: !this.state.form.terms
                        }
                      })
                    }
                    label="I agree to the Terms and Conditions"
                  />
                  <Form.Button
                    disabled={
                      !this.state.form.title ||
                      !this.state.form.description ||
                      !this.state.form.datetime ||
                      !this.state.form.address ||
                      !this.state.form.neighborhood ||
                      !this.state.form.city ||
                      !this.state.form.state ||
                      !this.state.form.terms ||
                      !this.state.queueComplete
                    }
                    type="submit"
                  >
                    Submit
                  </Form.Button>
                </Form>
                {this.state.isFormOnError && (
                  <ErrorMessage errorMessage={this.state.errorMessage} />
                )}
              </Popup.Content>
            </Popup>
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            width="very wide"
            animation="push"
            vertical
            visible={sidebarOpened}
          >
            <Card.Group style={{ padding: 10 }}>
              {this.state.posts.map(item => <FSCard {...item} />)}
            </Card.Group>
          </Sidebar>
          <Sidebar.Pusher>
            <Grid.Row>
              <Grid.Column>
                <div style={{ backgroundColor: "yellow", height: "100vh" }}>
                  <Button
                    style={{ margin: 10 }}
                    icon={!sidebarOpened}
                    labelPosition="left"
                    onClick={this.handleToggle}
                  >
                    <Icon
                      style={sidebarOpened ? { padding: 10 } : null}
                      size="large"
                      name={sidebarOpened ? "angle left" : "sidebar"}
                    />
                    {sidebarOpened ? null : "Expandir "}
                  </Button>
                </div>
              </Grid.Column>
            </Grid.Row>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
        {/* Same as */}
        <ToastContainer />
      </Responsive>
    );
  }
}

export default App;
