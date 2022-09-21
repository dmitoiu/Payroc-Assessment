import React, {useEffect, useState} from 'react';
import { LockClosedIcon, ExclamationIcon} from '@heroicons/react/solid';
import {useLocation} from "react-router-dom";
import auth from "../helpers/authHelper";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";
import {logIn} from "../actions/authActions";
import logo from "../resources/images/dmitoiu_portfolio-dark.png";

const LoginForm = () => {
    let history = useLocation();
    const initialState = {email: "", password: ""};
    // Create form data state
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    // Get log in state
    const userLogIn = useSelector(state => state.authLogIn);
    // Get log in state data
    const {error, userInfo} = userLogIn;
    let [rememberMe, setRememberMe] = useState(false);

    const handleOnChange = (e) => {
        setFormData({ ... formData, [e.target.name]: e.target.value});
        console.log("Form Data: ", formData);
    }

    useEffect(() => {
        if(userInfo){
            // Send user to initial page if is logged in
            history.push("/");
        }
        let rememberMe = auth.getRememberMe("RememberMe");
        if(rememberMe !== null){
            console.log("Remember me: ", rememberMe);
            setFormData({... formData, email: rememberMe.email, password: rememberMe.password});
            setRememberMe(true)
            console.log("form: ", formData);
        }
    }, [history, userInfo])


    const onLogInButton = async (event) => {
        // Stop page refresh
        event.preventDefault();
        await dispatch(logIn(formData.email, formData.password));
        console.log("Error:", error, "UserInfo", userInfo);
    }

    const rememberMeOnChange = (e) => {
        console.log("Event: ", e);
        if(e.target.checked){
            auth.rememberMe("RememberMe", {
                email: formData.email,
                password: formData.password
            }, 10);
            setRememberMe(true);
        } else {
            console.log("Clear...");
            auth.clearRememberMe("RememberMe");
            setRememberMe(false);
        }
    }

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div className={"grid justify-items-center"}>
                        <img
                            className="mx-auto h-12 w-auto"
                            src={logo}
                            alt="Portfolio"
                            width={52}
                            height={52}
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log in to your portfolio</h2>
                    </div>
                    <form className="mt-8 space-y-6" method="POST" onSubmit={onLogInButton}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    onChange={handleOnChange}
                                    value={formData.email}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={handleOnChange}
                                    value={formData.password}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-slate-900 focus:border-slate-900 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={rememberMeOnChange}
                                    className="h-4 w-4 text-slate-900 focus:ring-slate-900 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-slate-900 hover:text-slate-900">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                </span>
                                Log in
                            </button>
                        </div>
                    </form>
                    {error ?
                        <div className="rounded-md bg-slate-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <ExclamationIcon className="h-5 w-5 text-slate-900" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-black-800">Attention needed</h3>
                                    <div className="mt-2 text-sm text-black-700">
                                        <p>
                                            The Email or Password provided is incorrect.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> : ""
                    }
                </div>
            </div>
        </>
    );
};

export default LoginForm;