import { createStore } from "redux";
import { reviewReducer } from "./reducer/review.reducer";

const store = createStore(reviewReducer);

export default store;