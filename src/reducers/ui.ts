import * as TYPES from "./../actions/types";

export default (state = {}, action: any) => {
  switch (action.type) {
    case TYPES.FETCH_POST:
    case TYPES.FETCH_POSTS:
    case TYPES.FETCH_MORE_POSTS:
    case TYPES.FETCH_MORE_COMMENTS_IN_POST:
      return { ...state, isLoading: true };
    case TYPES.FETCH_POST_ERROR:
    case TYPES.FETCH_POST_SUCCESS:
    case TYPES.FETCH_POSTS_ERROR:
    case TYPES.FETCH_POSTS_SUCCESS:
    case TYPES.FETCH_MORE_POSTS_ERROR:
    case TYPES.FETCH_MORE_POSTS_SUCCESS:
    case TYPES.FETCH_MORE_COMMENTS_IN_POST_ERROR:
    case TYPES.FETCH_MORE_COMMENTS_IN_POST_SUCCESS:
      return { ...state, isLoading: false };

    case TYPES.POST_COMMENT:
      return { isLoading: true, isPostingComment: true };
    case TYPES.POST_COMMENT_ERROR:
    case TYPES.POST_COMMENT_SUCCESS:
      return { isLoading: false, isPostingComment: false };
    default:
      return state;
  }
};
