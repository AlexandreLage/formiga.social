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
  Transition,
  Sticky,
  Rail
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
import { Gallery } from "./components";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { geolocated } from "react-geolocated";
import styles from "./loading.css";
import Loader from "react-loader-spinner";

const JSON_HEADERS = {
  "Content-Type": "application/json"
};

// const FORM_DATA_HEADERS = {
//   Accept: "application/json",
//   "Content-Type": "multipart/form-data"
// };

class MapContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markers: []
    };

    let markers = [];
    for (var i = 0; i < 100; i++) {
      let random = Math.floor(Math.random() * 10);

      markers.push({
        lat:
          -23.549842 +
          (-i ^ ((i % 2) * i * Math.floor(Math.random() * 10))) / 3003,
        lng:
          -46.6362884 +
          (-i ^ (((i + 1) % 2) * i * Math.floor(Math.random() * 10))) / 3003
      });

      markers.push({
        lat: -23.694106 + (i * Math.floor(Math.random() * 20)) / 3003,
        lng: -46.702469 + (i * Math.floor(Math.random() * 20)) / 3003
      });

      markers.push({
        lat: -23.694106 + (i * Math.floor(Math.random() * 17)) / 3003,
        lng: -46.702469 + (i * Math.floor(Math.random() * 15)) / 3003
      });
    }

    this.pushMarker(markers);
  }

  pushMarker = markers => {
    this.setState({ markers: [...this.state.markers, ...markers] });
  };

  componentDidMount() {
    let markers = [];
    if (this.props.latitude && this.props.longitude) {
      for (var i = 0; i < 50; i++) {
        let random = Math.floor(Math.random() * 10);

        markers.push({
          lat:
            this.props.latitude +
            (-i ^ ((i % 2) * i * Math.floor(Math.random() * 10))) / 3003,
          lng:
            this.props.longitude +
            (-i ^ (((i + 1) % 2) * i * Math.floor(Math.random() * 10))) / 3003
        });

        markers.push({
          lat:
            this.props.latitude + (i * Math.floor(Math.random() * 20)) / 3003,
          lng:
            this.props.longitude + (i * Math.floor(Math.random() * 20)) / 3003
        });

        markers.push({
          lat:
            this.props.latitude + (i * Math.floor(Math.random() * 17)) / 3003,
          lng:
            this.props.longitude + (i * Math.floor(Math.random() * 15)) / 3003
        });
      }
      this.pushMarker(markers);
    }
  }

  render() {
    return (
      <Map
        initialCenter={{
          lat: this.props.latitude || -23.681111,
          lng: this.props.longitude || -46.623196
        }}
        google={this.props.google}
        zoom={14}
      >
        {this.state.markers.map(position => {
          return <Marker position={position} />;
        })}
      </Map>
    );
  }
}

const Maps = GoogleApiWrapper({
  apiKey: "AIzaSyBL9Uv1__BU6cDB2XFqkyoZQ1LDSE16zpo"
})(MapContainer);

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

const FSCard = props => {
  return (
    <Card
      raised
      link
      fluid
      color="green"
      style={{ background: "linear-gradient(to bottom,#F7F7FF, white)" }}
    >
      <Gallery
        style={{ border: 0, margin: 0, padding: 0 }}
        showThumbnails
        images={props.pictures.map(item => ({
          caption: props.title,
          src: item,
          thumbnail: item,
          orientation: "squared",
          useForDemo: true
        }))}
      />
      <Card.Content>
        <Card.Header style={{ color: "#304240" }}>{props.title}</Card.Header>
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
};

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
      isFormOnError: false,
      loading: true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 2500); // simulates an async action, and hides the spinner

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

    //this.setState({ uploadFormOpen: true });
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
            this.setState({ submitted: true, uploadFormOpen: false }, () => {
              this.dropzone.removeAllFiles();
              this.handleTemporaryPost();
            });

            return;
          } else return res.text();
        })
        .then(post => {
          console.log("Permanent Post text response:", post);
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
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };

  render() {
    console.log("this.props.coords", this.props.coords);

    const { children } = this.props;
    const { sidebarOpened } = this.state;

    if (!this.state.loading) {
      return (
        <Responsive style={{ height: "100vh" }}>
          <ActionCable
            channel={{ channel: "PostsChannel" }}
            onReceived={this.handleReceivedPost}
          />
          <Menu inverted fixed="top" pointing style={{ background: "#304240" }}>
            <Menu.Item as={"a"} href="http://formiga.social">
              <Header style={{ padding: 10 }} inverted as="h1">
                <Icon name="recycle" size={40} /> formiga.social
              </Header>
            </Menu.Item>
            <Menu.Item position="left">
              <Popup
                style={{
                  borderRadius: 0,
                  opacity: 0.95,
                  padding: "2em"
                }}
                open={this.state.uploadFormOpen}
                flowing
                on="click"
                trigger={
                  <div ref={ref => (this.uploadButton = ref)}>
                    <Button
                      inverted
                      onClick={() =>
                        this.setState({
                          uploadFormOpen: !this.state.uploadFormOpen
                        })
                      }
                    >
                      <Icon name="cloud upload" />Upload
                    </Button>
                  </div>
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
                      <Button
                        fluid
                        type="button"
                        disabled
                        icon
                        labelPosition="right"
                      >
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
                      style={{ color: "white" }}
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
          <Sidebar.Pushable style={{ height: "100vh" }}>
            <Sidebar
              as={Menu}
              width="very wide"
              animation="push"
              vertical
              visible={sidebarOpened}
              style={{
                marginTop: 50,
                overflow: "hidden",
                background: "linear-gradient(to bottom, #304240, #000)"
              }}
            >
              <Card.Group style={{ padding: 10, marginTop: 90 }}>
                <div style={{ marginLeft: 10 }}>
                  <Header inverted as="h2">
                    Pictures feed
                  </Header>
                  <p style={{ color: "#F7F7FF" }}>
                    Let's share public service issues in our society.
                  </p>
                </div>

                {this.state.posts.map(item => <FSCard {...item} />)}
              </Card.Group>
            </Sidebar>
            <Sidebar.Pusher
              style={{ backgroundColor: "#304240", height: "100vh" }}
            >
              <Grid.Row>
                <Grid.Column>
                  <div>
                    <Maps
                      latitude={this.props.coords && this.props.coords.latitude}
                      longitude={
                        this.props.coords && this.props.coords.longitude
                      }
                    />
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
                      {sidebarOpened ? null : "Expand "}
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
    } else {
      return (
        <div
          className={"loading"}
        >
            <Loader type="Triangle" color="#000" height={80} width={80} />
        </div>
      );
    }
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(App);

//export default App;
