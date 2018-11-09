import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, Button, ListGroup, Input } from 'reactstrap';

import Post from '../components/Post';
import Comment from './../components/Comment';
import EmptyBlock, { getPlaceholderBlocks } from './../components/Placeholder';

import { fetchPost, fetchMoreComments, postComment } from './../actions/actions';

type Props = {
  match: any,

  fetchPostDetails: Function,
  fetchMoreComments: Function,
  postComment: Function,

  post: any,
  comments: Array<any>,

  isPostingComment: boolean
};

class PostDetails extends React.Component<Props, { comment: string }> {

  postId = this.props.match.params.postId;

  constructor(props: Props) {
    super(props);

    this.state = {
      comment: ''
    };
  }

  componentDidMount() {
    this.props.fetchPostDetails(this.postId);
  }

  onClickAddComment = () => {
    this.props.postComment(this.postId, this.state.comment.trim())
      .then(() => this.setState({ comment: '' }))
  }

  onClickLoadMoreComments = () => {
    const offset = this.props.comments.length;
    this.props.fetchMoreComments(this.props.post.id, offset, 3);
  }

  displayComment = (comment: any) =>
    <Comment key={comment.id + comment.body} comment={comment}></Comment>;

  addCommentBlock = (
    <Card>
      <CardBody>
        <Input value={this.state.comment} onChange={ev => this.setState({ comment: ev.target.value.trim() })} type="textarea" style={{ backgroundColor: 'rgba(0,0,0,0.05)', color: 'var(--purple)' }}></Input>
        <Button className="my-2" disabled={this.state.comment.length < 5 || this.props.isPostingComment} outline color="primary" onClick={this.onClickAddComment}>Post</Button>
      </CardBody>
    </Card>
  );

  loadMoreButtonBlock = (
    <Row>
      <Col>
        <Button outline color="primary" onClick={this.onClickLoadMoreComments}>Load more comments...</Button>
      </Col>
    </Row>
  );

  render() {
    const post = this.props.post;
    const comments = this.props.comments || [];

    const postComponent = (
      <Row>
        <Col><Post post={post}></Post></Col>
      </Row>
    );

    const commentsBlock = (
      <ListGroup className="mb-2">
        {
          comments.length
          ? comments.map(comment => this.displayComment(comment))
          : getPlaceholderBlocks(10)
        }
      </ListGroup>
    );

    return (
      <div className="d-flex flex-column py-2">
        { post ? postComponent : <EmptyBlock /> }

        <div className="p-2">
          <p className="text-purple m-0 font-weight-bold">Comments</p>
        </div>

        <div className="flex-grow-1 overflow-auto">
          { this.addCommentBlock }
          { commentsBlock }
          { comments.length > 0 && this.loadMoreButtonBlock }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  ...state.postDetails,
  isPostingComment: state.UI.isPostingComment
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPostDetails: (postId: string) => dispatch(fetchPost(postId)),
  fetchMoreComments: (postId: string, offset: number) => dispatch(fetchMoreComments(postId, offset)),
  postComment: (postId: string, message: string) => dispatch(postComment(postId, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);