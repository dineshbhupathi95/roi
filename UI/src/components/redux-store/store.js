import { createStore } from "redux";
import useAddProjectReducer from "./Reducers";

const store = createStore(useAddProjectReducer)

export default store;
