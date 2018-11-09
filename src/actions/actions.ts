import * as TYPES from "./types";

// API METHODS

const getPosts = (offset = 0) =>
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(p => p.slice(offset, offset + 10));

const getPost = (id: string) =>
  fetch("https://jsonplaceholder.typicode.com/posts/" + id).then(res =>
    res.json()
  );

const getPostComments = (postId: string, offset: number, limit = 3) => {
  // Set offset back to zero, because the json api is limiting
  // offset = 0;

  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(res => res.json())
    .then(comments => comments.slice(offset, offset + limit));
};

const sendComment = (postId: string, message: string) => {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
    method: "POST",
    body: JSON.stringify({
      email: 'you@you.com',
      body: message,
      userId: Math.random() * 1000
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => res.json());
};

// END: API METHODS


// ACTION CREATORS

export const fetchPost = (id: string) => (dispatch: any) => {
  dispatch({ type: TYPES.FETCH_POST });

  Promise.all([
    getPost(id),
    getPostComments(id, 0, 3)
  ])
  .then(([post, comments]: [any, any]) => {
    dispatch(fetchPostSuccess({ post, comments }))
  })
  .catch((err: any) => dispatch(fetchPostError(err)));
};

export const fetchPostSuccess = (posts: any) => ({
  type: TYPES.FETCH_POST_SUCCESS,
  payload: posts
});

export const fetchPostError = (err: any) => ({
  type: TYPES.FETCH_POST_ERROR,
  payload: err
});

export const fetchPosts = () => (dispatch: any) => {
  dispatch({ type: TYPES.FETCH_POSTS });

  getPosts(0)
    .then(posts => dispatch(fetchPostsSuccess(posts)))
    .catch(err => dispatch(fetchPostsError(err)));
};

export const fetchPostsSuccess = (posts: any) => ({
  type: TYPES.FETCH_POSTS_SUCCESS,
  payload: posts
});

export const fetchPostsError = (err: any) => ({
  type: TYPES.FETCH_POSTS_ERROR,
  payload: err
});

export const fetchMorePosts = (offset: number) => (dispatch: any) => {
  dispatch({ type: TYPES.FETCH_MORE_POSTS });

  getPosts(offset)
    .then(posts => dispatch(fetchMorePostsSuccess(posts)))
    .catch(err => dispatch(fetchMorePostsError(err)));
};

export const fetchMorePostsSuccess = (posts: any) => ({
  type: TYPES.FETCH_MORE_POSTS_SUCCESS,
  payload: posts
});

export const fetchMorePostsError = (err: any) => ({
  type: TYPES.FETCH_MORE_POSTS_ERROR,
  payload: err
});

export const fetchMoreComments = (postId: string, offset: number) => (dispatch: any) => {
  dispatch({ type: TYPES.FETCH_MORE_COMMENTS_IN_POST });

  getPostComments(postId, offset, 10)
    .then(comments => dispatch(fetchMoreCommentsSuccess(comments)))
    .catch(err => dispatch(fetchMoreCommentsError(err)));
};

export const fetchMoreCommentsSuccess = (comments: any) => ({
  type: TYPES.FETCH_MORE_COMMENTS_IN_POST_SUCCESS,
  payload: comments
});

export const fetchMoreCommentsError = (err: any) => ({
  type: TYPES.FETCH_MORE_COMMENTS_IN_POST_ERROR,
  payload: err
});

export const postComment = (postId: string, message: string) => (dispatch: any) => {
  dispatch({ type: TYPES.POST_COMMENT });

  return sendComment(postId, message)
    .then(comment => dispatch(postCommentSuccess(comment)))
    .catch(err => dispatch(postCommentError(err)));
};

export const postCommentSuccess = (comment: any) => ({
  type: TYPES.POST_COMMENT_SUCCESS,
  payload: comment
});

export const postCommentError = (err: any) => ({
  type: TYPES.POST_COMMENT_ERROR,
  payload: err
});

// END: ACTION CREATORS