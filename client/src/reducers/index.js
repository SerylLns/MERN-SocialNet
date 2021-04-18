import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from './users.reducer';
import postReducer from "./post.reducer";
import errorsReducer from "./errors.reducer";
import allPostsReducer from "./allPosts.reducer";
import trendingReducer from "./trending.reducer";

export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  errorsReducer,
  allPostsReducer,
  trendingReducer
});