import React from "react";
import { Container } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';

import NavBar from "./components/NavBar";
import Posts from "./containers/Posts.container";
import PostDetails from "./containers/PostDetails.container";

function App(props: any) {
  console.log(props)
  let spinnerClassName = 'request-spinner-container';
  if (props.isLoading) {
    spinnerClassName += ' display-spinner';
  }
  return (
    <Router>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        <NavBar />

        <Container fluid className="flex-grow-1" style={{ overflow: "auto" }}>
          <Switch>
            <Route exact path="/posts" component={Posts} />
            <Route path="/posts/:postId" component={PostDetails} />
            <Redirect to="/posts" />
          </Switch>
        </Container>

        <div className={spinnerClassName}>
          <i className="mr-spinner"></i>
        </div>
      </div>
    </Router>
  );
}

const mapStateToProps = (state: any) => ({ isLoading: state.UI.isLoading });

export default connect(mapStateToProps)(App);
