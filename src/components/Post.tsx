import React from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";

import { Link } from "react-router-dom";

type Props = {
  post: any
};

type State = {
  isTruncated: boolean
  body: string
};

export default class Post extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

    this.state = {
      body: this.truncateText(props.post.body),
      isTruncated: true
    };
  }

  truncateText = (text: string, limit = 100) => {
    return text.slice(0, limit);
  }

  toggleTruncate = () => {
    if (this.state.isTruncated) {
      this.setState({
        isTruncated: false,
        body: this.props.post.body
      });
    } else {
      this.setState({
        isTruncated: true,
        body: this.truncateText(this.props.post.body)
      });
    }
  }

  render() {
    let post = this.props.post;

    return (
      <div>
        <Card>
          <CardBody>
            <CardTitle>
              <Link to={"/posts/" + post.id}>{post.title}</Link>
            </CardTitle>
  
            <CardText>{this.state.body}</CardText>
            <a href="javascript:;" onClick={this.toggleTruncate}>
              { this.state.isTruncated ? 'Read more' : 'Show less' }
            </a>
          </CardBody>
        </Card>
      </div>
    );
  }
}