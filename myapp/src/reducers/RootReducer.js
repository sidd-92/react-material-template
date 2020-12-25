import { combineReducers } from "redux";
import DemoArticleReducer from "./DemoArticleReducer";
import DemoListReducer from "./DemoListReducer";

const rootReducer = combineReducers({
  DemoArticleReducer,
  DemoListReducer,
});

export default rootReducer;
