import {
    CONTACT_LIST_FAIL,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_REQUEST,
    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
    CONTACT_SAVE_REQUEST,
    CONTACT_SAVE_SUCCESS,
    CONTACT_SAVE_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL
} from '../constants/contactConstants';

function contactListReducer(state = { contacts: [] }, action) {
    switch (action.type) {
        case CONTACT_LIST_REQUEST:
            return { loading: true, contacts: [] };
        case CONTACT_LIST_SUCCESS:
            return { loading: false, contacts: action.payload };
        case CONTACT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function contactDetailsReducer(state = { contact: {} }, action) {
    switch (action.type) {
        case CONTACT_DETAILS_REQUEST:
            return { loading: true };
        case CONTACT_DETAILS_SUCCESS:
            return { loading: false, contact: action.payload };
        case CONTACT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

function contactSaveReducer(state = { contact: {} }, action) {
    switch (action.type) {
        case CONTACT_SAVE_REQUEST:
            return { loading: true };
        case CONTACT_SAVE_SUCCESS:
            return { loading: false, success: true, contact: action.payload };
        case CONTACT_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

function contactDeleteReducer(state = { contact: {} }, action) {
    switch (action.type) {
        case CONTACT_DELETE_REQUEST:
            return { loading: true };
        case CONTACT_DELETE_SUCCESS:
            return { loading: false, success: true, contact: action.payload };
        case CONTACT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
export {
    contactListReducer,
    contactDetailsReducer,
    contactSaveReducer,
    contactDeleteReducer,
}; 
