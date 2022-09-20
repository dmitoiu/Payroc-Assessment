// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// Portfolio (store.js) v1.0.0 13/03/2021
// A web application designed for a personal website
// -----------------------------------------------------------------------

// Importing components
import {createStore} from "redux";
import {combineReducers} from "redux";
import {applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";
import {authLogInReducer, authRegisterReducer} from "./reducers/authReducers";
import thunk from "redux-thunk";
import {
    postContentReducer,
    postDataReducer,
    postDeleteReducer,
    postReducer
} from "./reducers/postReducers";
import {useMemo} from "react";

const session = typeof window !== "undefined";
// Get user information
const getUserInfoStorage = session ? (sessionStorage.getItem("authDetails") ?
                                     JSON.parse(sessionStorage.getItem("authDetails")) : null) : null;
// Create Initial state
const initialState = {
    authLogIn: {userInfo: getUserInfoStorage}
}

let store;

// Create reducers
const reducers = combineReducers({
    authLogIn: authLogInReducer,
    authRegister: authRegisterReducer,
    post: postReducer,
    postData: postDataReducer,
    postContentData: postContentReducer,
    postDelete: postDeleteReducer,
});

function initStore() {
    return createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    )
}

export const initializeStore = (preloadedState) => {
    let _store = store ?? initStore(preloadedState)
    // After navigating to a page with an initial Redux state, merge the state
    // with the current state in the store, and create a new store
    if (preloadedState && store) {
        _store = initStore({
            ...store.getState(),
            ...preloadedState,
        })
        // Reset the current store
        store = undefined
    }

    // For SSG and SSR always create a new store
    if (typeof window === 'undefined') return _store
    // Create the store once in the client
    if (!store) store = _store

    return _store
}

export function useStore() {
    const store = useMemo(() => initializeStore(initialState), [initialState])
    return store
}

export default store;