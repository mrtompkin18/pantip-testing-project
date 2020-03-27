import { ADD_REVIEW } from "../../action/review.action";

const initialState = { reviews: [] }
export const reviewReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ADD_REVIEW:
            return { ...state, reviews: payload };
        default:
            return state;
    }
};