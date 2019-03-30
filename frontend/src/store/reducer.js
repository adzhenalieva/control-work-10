import {
    FETCH_DATA_SUCCESS,
    FETCH_ONE_ITEM_SUCCESS,
    FETCH_FAILURE,
    DELETED, FETCH_COMMENT_SUCCESS
} from "./actions";

const initialState = {
    news: [],
    comments: [],
    error: null,
    oneItem: null,
    oneItemId: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                news: action.data
            };
        case FETCH_COMMENT_SUCCESS:
            return {
                ...state,
                comments: action.data
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
                oneItemId: null,
                error: action.error
            };
        case FETCH_ONE_ITEM_SUCCESS:
            return {
                ...state,
                oneItem: action.item,
                oneItemId: action.id
            };
        default:
            return state;
    }
};

export default reducer;