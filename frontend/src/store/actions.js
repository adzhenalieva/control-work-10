import axios from "../axios-api";
import {NotificationManager} from "react-notifications";

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const CREATE_NEW_SUCCESS = "CREATE_NEW_SUCCESS";
export const FETCH_ONE_ITEM_SUCCESS = "FETCH_ONE_ITEM_SUCCESS";
export const DELETED = "DELETED";
export const CREATE_NEW_COMMENT_SUCCESS = "CREATE_NEW_COMMENT_SUCCESS";
export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS";
export const fetchDataSuccess = data => {
    return {type: FETCH_DATA_SUCCESS, data};
};
export const dataFailure = error => ({type: FETCH_FAILURE, error});

export const fetchOneItemSuccess = item => {
    return {type: FETCH_ONE_ITEM_SUCCESS, item};
};
export const createNewSuccess = () => ({type: CREATE_NEW_SUCCESS});
export const createNewCommentSuccess = () => ({type: CREATE_NEW_COMMENT_SUCCESS});
export const fetchCommentsSuccess = data => {
    return {type: FETCH_COMMENT_SUCCESS, data};
};


export const createNotification = (type) => {
    return () => {
        switch (type) {
            case 'success':
                NotificationManager.success("Success", 'Success');
                break;
            case 'error':
                NotificationManager.error("Error", 'Database error 500', 5000);
                break;
            default:
                break;
        }
    };
};


export const fetchData = () => {
    return dispatch => {
        return axios.get('/news').then(
            response => {
                dispatch(fetchDataSuccess(response.data));
            },
            error => {
                dispatch(dataFailure(error));
                dispatch(createNotification('error'));
            }
        );
    };
};

export const fetchComments = (id) => {
    return dispatch => {
        return axios.get('/comments/' + id).then(
            response => {
                dispatch(fetchCommentsSuccess(response.data));
            },
            error => {
                dispatch(dataFailure(error));
                dispatch(createNotification('error'));
            }
        );
    };
};
export const createNews = data => {
    return dispatch => {
        return axios.post('/news', data).then(
            () => {
                dispatch(createNewSuccess());
                dispatch(createNotification('success'));
            }, error => {
                dispatch(dataFailure(error));
            }
        );
    };
};

export const createComment = data => {
    return dispatch => {
        return axios.post('/comments', data).then(
            () => {
                dispatch(createNewCommentSuccess());
                dispatch(createNotification('success'));
            }, error => {
                dispatch(dataFailure(error));
            }
        );
    };
};

export const openOneItem = id => {
    return dispatch => {
        return axios.get('/news/' + id).then(
            response => {
                dispatch(fetchOneItemSuccess(response.data))
            }, error => {
                dispatch(dataFailure(error));
                dispatch(createNotification('error'));
            }
        );
    };
};


export const dataDelete = (id, history) => {
    return dispatch => {
        axios.delete('/news/' + id).then(() => {
            dispatch({type: DELETED});
            dispatch(createNotification('success'));
            history.push({
                pathname: '/news'
            })
        })
    };
};
export const commentDelete = (id, history) => {
    return dispatch => {
        axios.delete('/comments/' + id).then(() => {
            dispatch(createNotification('success'));
            history.push({
                pathname: '/news'
            })
        })
    };
};