// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// Portfolio (postReducers.js) v1.0.0 13/03/2021
// A web application designed for a personal website
// -----------------------------------------------------------------------

// Importing constants
import {
    POST_DATA_FAIL,
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_FAIL,
    POST_REQUEST,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_SUCCESS,
    POST_DATA_CONTENT_REQUEST,
    POST_DATA_CONTENT_SUCCESS,
    POST_DATA_CONTENT_FAIL,
    POST_UPDATE_SUCCESS, POST_UPDATE_REQUEST, POST_UPDATE_FAIL
} from "../constants/postConstants";

/**
 * Project Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{}|{loading: boolean, error: *}|{userInfo: *, loading: boolean}}
 */
const postReducer = (state = {}, action) => {
    if(action.type.match(POST_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(POST_SUCCESS)) {
        return {loading: false, userInfo: action.payload}
    } else if(action.type.match(POST_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Voucher Retrieve Interest Data Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{vouchers: []}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const postDataReducer = (state = {projects: []}, action) => {
    if(action.type.match(POST_DATA_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(POST_DATA_SUCCESS)) {
        return {loading: false, postsInfo: action.payload}
    } else if(action.type.match(POST_DATA_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Project Retrieve Data Content Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{projects: []}|{projectInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const postContentReducer = (state = {project: {}}, action) => {
    if(action.type.match(POST_DATA_CONTENT_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(POST_DATA_CONTENT_SUCCESS)) {
        return {loading: false, postsContent: action.payload}
    } else if(action.type.match(POST_DATA_CONTENT_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Update Project
 * @param state
 * @param action
 * @returns {{loading: boolean}|{projects: []}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const postUpdateReducer = (state = {project: {}}, action) => {
    if(action.type.match(POST_UPDATE_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(POST_UPDATE_SUCCESS)) {
        return {loading: false, postsInfo: action.payload}
    } else if(action.type.match(POST_UPDATE_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

/**
 * Voucher Interest Count Reset Reducer
 * @param state
 * @param action
 * @returns {{loading: boolean}|{}|{vouchersInfo: *, loading: boolean}|{loading: boolean, error: *}}
 */
const postDeleteReducer = (state = {}, action) => {
    if(action.type.match(POST_DELETE_REQUEST)) {
        return {loading: true};
    } else if(action.type.match(POST_DELETE_SUCCESS)) {
        return {loading: false, postsInfo: action.payload}
    } else if(action.type.match(POST_DELETE_FAIL)) {
        return {loading: false, error: action.payload}
    } else {
        return state;
    }
}

export {postReducer, postDataReducer, postContentReducer, postUpdateReducer, postDeleteReducer}