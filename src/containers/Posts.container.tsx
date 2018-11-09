import React from 'react';
import { connect } from 'react-redux';

import { Row, Col, Button } from 'reactstrap';

import Post from './../components/Post';
import { getPlaceholderBlocks } from './../components/Placeholder';

import { fetchPosts, fetchMorePosts } from './../actions/actions';

type Props = {
  isLoading: boolean,
  posts: Array<any>,
  fetchPosts: Function,
  fetchMorePosts: Function,
};

class Posts extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchPosts();
  }

  onLoadMoreClick = () => {
    const offset = this.props.posts.length + 1;
    this.props.fetchMorePosts(offset);
  }

  displayPost = (post: any) => (
    <Col key={post.id} xs="12" style={{ padding: 0, paddingTop: 10 }}>
      <Post post={post}></Post>
    </Col>
  );

  render() {
    const posts = this.props.posts;
    const isLoadingData = this.props.isLoading;

    const loadMoreButton = (
      <Button className="mx-auto my-2" disabled={isLoadingData} outline color="primary" onClick={this.onLoadMoreClick}>Load more...</Button>
    );

    return (
      <Row>
        <Col xs="12" lg="6" className="m-auto">
          {
            posts.length
            ? posts.map(post => this.displayPost(post))
            : getPlaceholderBlocks(10)
          }

          { isLoadingData && getPlaceholderBlocks(10) }

          { posts.length > 0 && loadMoreButton }
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchPosts: () => dispatch(fetchPosts()),
    fetchMorePosts: (offset: number) => dispatch(fetchMorePosts(offset))
  };
};

const mapStateToProps = (state: any) => ({ posts: state.posts, isLoading: state.UI.isLoading });

export default connect(mapStateToProps, mapDispatchToProps)(Posts);