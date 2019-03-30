import {
    FETCH_DATA_SUCCESS,
    FETCH_ONE_ITEM_SUCCESS,
    FETCH_FAILURE,
    DELETED
} from "./actions";

const initialState = {
    news: [],
    error: null,
    oneItem: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                news: action.data
            };
        case FETCH_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case DELETED:
            return {
                ...state,
                oneItem: null,
                error: action.error
            };
        case FETCH_ONE_ITEM_SUCCESS:
            return {
                ...state,
                oneItem: action.item
            };
        default:
            return state;
    }
};

export default reducer;