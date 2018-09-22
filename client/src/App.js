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
  TextArea
} from "semantic-ui-react";

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from "semantic-ui-calendar-react";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    posts: [],
    sidebarOpened: true,
    uploadFormOpen: false,
    date: "16-09-1993"
  };

  componentDidMount() {
    window
      .fetch("/api/posts")
      .then(response => response.json())
      .then(posts => this.setState({ posts }))
      .catch(error => console.log(error));
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;
    if (sidebarOpened) this.setState({ sidebarOpened: false });
  };

  handleToggle = () =>
    this.setState({ sidebarOpened: !this.state.sidebarOpened });

  handleDateChange = (event, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
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
                <Form>
                  <Form.Field>
                    <label>Title</label>
                    <input placeholder="Write one title for picture" />
                  </Form.Field>
                  <Form.Field
                    id="form-textarea-control-description"
                    control={TextArea}
                    label="Description"
                    placeholder="Explain the issue on the picture"
                  />
                  <Form.Field>
                    <label>Date</label>
                    <DateInput
                      name="date"
                      placeholder="Date of the picture"
                      value={this.state.date}
                      iconPosition="left"
                      onChange={this.handleDateChange}
                    />
                  </Form.Field>

                  <Form.Field>
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

                  <Form.Field>
                    <Checkbox label="I agree to the Terms and Conditions" />
                  </Form.Field>
                  <Button type="submit">Submit</Button>
                </Form>
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
