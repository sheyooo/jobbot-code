import { combineReducers } from "redux";

import { postReducer, postsReducer } from "./posts";
import uiReducer from "./ui";

export default combineReducers({
  postDetails: postReducer,
  posts: postsReducer,
  UI: uiReducer
});
