import * as TYPES from "./../actions/types";

type postState = {
  post?: any,
  comments?: any
};

export const postReducer = (state: postState = {}, action: any) => {
  switch (action.type) {
    case TYPES.FETCH_POST:
      return {};
    case TYPES.FETCH_POST_SUCCESS:
      return action.payload;
    case TYPES.FETCH_MORE_COMMENTS_IN_POST_SUCCESS:
      return { post: state.post, comments: [...state.comments, ...action.payload] };
    case TYPES.POST_COMMENT_SUCCESS:
      return { post: state.post, comments: [action.payload, ...state.comments]};
    default:
      return state;
  }
};

export const postsReducer = (state = [], action: any) => {
  switch (action.type) {
    case TYPES.FETCH_POSTS_SUCCESS:
      return action.payload;
    case TYPES.FETCH_MORE_POSTS_SUCCESS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
