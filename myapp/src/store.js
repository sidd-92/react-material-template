import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/RootReducer";
import thunk from "redux-thunk";

const initialstate = {};

const store = createStore(rootReducer, initialstate, applyMiddleware(thunk)); //reducer, initialstate, middleware

store.subscribe(
  //called each time store is changed
  () => {
    console.log("Store Updated..");
    console.log(store.getState());
  }
);

export default store;
