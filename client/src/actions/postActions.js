// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// RGU eShop (voucherActions.js) v1.0.0 13/03/2021
// A web application designed for a ecommerce shop
// -----------------------------------------------------------------------

// Importing components
import {
    POST_DATA_FAIL,
    POST_DATA_REQUEST,
    POST_DATA_SUCCESS,
    POST_FAIL,
    POST_UPDATE_REQUEST,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_FAIL,
    POST_REQUEST,
    POST_DELETE_FAIL,
    POST_DELETE_REQUEST,
    POST_DELETE_SUCCESS,
    POST_SUCCESS,
    POST_DATA_CONTENT_REQUEST,
    POST_DATA_CONTENT_SUCCESS,
    POST_DATA_CONTENT_FAIL,
    POST_ADD_SUCCESS,
    POST_ADD_FAIL, POST_ADD_REQUEST
} from "../constants/postConstants";
import auth from "../helpers/authHelper";

const addPost = (title, content) => async (dispatch) => {
    try{
        // Dispatch project request
        dispatch({
            type: POST_ADD_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.isAuthenticated().token}`,
        }

        // Create request body
        const data = {
            title: title,
            content: content
        }

        console.log("Data: ", data);

        // Create complete request
        let response = await fetch("/api/posts/add", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: POST_ADD_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: POST_ADD_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const updateProject = (name, content) => async (dispatch) => {
    try{
        // Dispatch project request
        dispatch({
            type: POST_UPDATE_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.isAuthenticated().token}`,
        }

        // Create request body
        const data = {
            name: name,
            content: content
        }

        // Create complete request
        let response = await fetch("/api/projects/update", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: POST_UPDATE_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: POST_UPDATE_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all vouchers and their interest count
 * @returns {function(...[*]=)}
 */
const getPosts = () => async (dispatch) => {
    try{
        // Get voucher data request
        dispatch({
            type: POST_DATA_REQUEST
        })

        // Crete request method
        const method = "GET";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        // Create complete request
        let response = await fetch("/api/posts", {
            method: method,
            headers: headers,
        });

        // Get result as json
        let result = await response.json();

        // If there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: POST_DATA_SUCCESS,
                payload: result
            })

        } else {
            dispatch({
                type: POST_DATA_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Get all vouchers and their interest count
 * @returns {function(...[*]=)}
 */
const getPostContent = (id) => async (dispatch) => {
    try{
        // Get project data request
        dispatch({
            type: POST_DATA_CONTENT_REQUEST
        })

        // Crete request method
        const method = "GET";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }

        // Create complete request
        let response = await fetch(`/api/posts/${id}`, {
            method: method,
            headers: headers,
        });

        // Get result as json
        let result = await response.json();

        // If there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: POST_DATA_CONTENT_SUCCESS,
                payload: result
            })

        } else {
            dispatch({
                type: POST_DATA_CONTENT_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Delete project using the name of the project
 * @param projectName
 * @returns {function(...[*]=)}
 */
const deletePost = (postName) => async (dispatch) => {
    try{
        // Dispatch voucher request
        dispatch({
            type: POST_DELETE_REQUEST
        })

        // Create request method
        const method = "POST";

        // Create request headers
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${auth.isAuthenticated().token}`,
        }

        // Create request body
        const data = {
            name: postName,
        }

        // Create complete request
        let response = await fetch("/api/posts/delete", {
            method: method,
            headers: headers,
            body:JSON.stringify(data)
        });

        // Get result as json
        let result = await response.json();

        // IF there is no error, dispatch success
        if(result.error == null){
            dispatch({
                type: POST_DELETE_SUCCESS,
                payload: result
            })
        } else {
            dispatch({
                type: POST_DELETE_FAIL,
                payload: result.error
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export {addPost, updateProject, deletePost, getPosts, getPostContent};