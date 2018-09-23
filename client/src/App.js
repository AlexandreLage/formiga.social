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
  Message
} from "semantic-ui-react";

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from "semantic-ui-calendar-react";

const ErrorMessage = props => {

    let merged_messages = props.errorMessage.reduce((sum, item) => sum + '\n' + item)
    return <Message error header="Ops!" content={merged_messages} />;
};

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    posts: [],
    sidebarOpened: true,
    uploadFormOpen: false,
    form: {
      title: "",
      datetime: "",
      description: "",
      address: "",
      neighborhood: "",
      number: "",
      city: "",
      state: ""
    },
    form_errors: {
      titleError: false,
      datetimeError: false,
      descriptionError: false,
      addressError: false,
      neighborhoodError: false,
      cityError: false,
      stateError: false
    },
    errorMessage: [''],
    isFormOnError: false,
  };

  componentDidMount() {
    window
      .fetch("/api/posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts }))
      .catch(error => console.log(error));

      this.setState({uploadFormOpen: true})
  }

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

    let isFormOnError = titleError || descriptionError;
    let form_errors = {
      ...this.state.form_errors,
      titleError,
      descriptionError
    }
    this.setState({ isFormOnError, form_errors, errorMessage});
  };

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive>
        <Menu pointing secondary attached="top">
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

                  <Form.Field required>
                    <label>Picture</label>
                    <Button disabled icon labelPosition="left">
                      <Icon name="camera retro" />
                      Open camera
                    </Button>
                    <Button icon labelPosition="right">
                      Choose from computer
                      <Icon name="file image" />
                    </Button>
                  </Form.Field>

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
                      name="datetime"
                      placeholder="Date of the picture"
                      value={this.state.form.datetime}
                      iconPosition="left"
                      onChange={this.handleDateChange}
                    />
                  </Form.Field>

                  <Form.Group>
                    <Form.Input
                      label="Address"
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

                  <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                  </Form.Field>
                  <Form.Button
                    disabled={
                      !this.state.form.title ||
                      !this.state.form.description ||
                      !this.state.form.datetime ||
                      !this.state.form.address ||
                      !this.state.form.neighborhood ||
                      !this.state.form.city ||
                      !this.state.form.state
                    }
                    type="submit"
                  >
                    Submit
                  </Form.Button>
                </Form>
                { this.state.isFormOnError && (<ErrorMessage errorMessage={this.state.errorMessage} />)}
              </Popup.Content>
            </Popup>
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable>
          <Sidebar
            as={Menu}
            width="wide"
            animation="push"
            inverted
            vertical
            visible={sidebarOpened}
          >
            {this.state.posts.map(item => (
              <p style={{ color: "white" }}>{JSON.stringify(item)}</p>
            ))}
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
      </Responsive>
    );
  }
}

export default App;
