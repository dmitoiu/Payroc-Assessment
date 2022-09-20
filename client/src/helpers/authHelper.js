// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwitStips (authHelper.js) v1.0.0 13/03/2021
// A web application designed for personal use
// -----------------------------------------------------------------------

// Importing components
import React from 'react';

/**
 * Authentication helper functions
 * Reference: Lab 6 Part 1 - http://campusmoodle.rgu.ac.uk/mod/resource/view.php?id=3853318
 * Reference: Lab 6 Part 2 - http://campusmoodle.rgu.ac.uk/mod/resource/view.php?id=3868900
 * @type {{clearJWT(): void, authenticate(*=): void, isAuthenticated(): (boolean|any)}}
 */
const auth = {
    isAuthenticated() {
        if (typeof window == "undefined")
            return false
        if (sessionStorage.getItem('authDetails'))
            return JSON.parse(sessionStorage.getItem('authDetails'))
        else
            return false
    },
    authenticate(state) {
        if (typeof window !== "undefined")
            sessionStorage.setItem('authDetails', JSON.stringify(state))
    },
    clearJWT() {
        if (typeof window !== "undefined")
            sessionStorage.removeItem('authDetails')
    },
    rememberMe(key, value, expiration){
        if(typeof window !== "undefined"){
            const now = new Date()
            const item = {
                value: value,
                expiry: now.getTime() + expiration
            }
            localStorage.setItem(key, JSON.stringify(item));
        }
    },
    getRememberMe(key){
        if(typeof window !== "undefined"){
            const itemStr = localStorage.getItem(key);
            if (!itemStr) {
                return null;
            }
            const item = JSON.parse(itemStr);
            return item.value;
        }
    },
    clearRememberMe(key){
        localStorage.removeItem(key);
    }
}

export default auth;