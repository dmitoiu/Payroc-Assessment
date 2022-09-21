import React, {Fragment, useEffect, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import {useDispatch, useSelector} from "react-redux";
import { stateToHTML} from 'draft-js-export-html';
import {Editor} from "react-draft-wysiwyg";
import {EditorState} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import {addPost, getPosts} from "../actions/postActions";
import {ExclamationCircleIcon} from "@heroicons/react/20/solid";

export default function PostDialog({dialogOpen, showEditProjectDialog}) {
    let [open, setOpen] = useState(true);
    let [editorState, setEditorState] = useState();
    let [editorMount, setEditorMount] = useState(false);
    let cancelButtonRef = React.createRef();
    const dispatch = useDispatch();
    // Declare and assign values for initial state
    const initialState = {
        postTitle: "",
    };
    // Declare and assign values for error state
    const errorState = {
        nameError: false,
        descriptionError: false,
        languagesError: false
    };

    const inputStyles = {
        success: "block w-full rounded-md border-gray-300 shadow-sm " +
            "focus:border-red-500 focus:ring-red-500 sm:text-sm",
        error: "block w-full rounded-md border-gray-300 shadow-sm " +
            "focus:border-red-500 focus:ring-red-500 sm:text-sm " +
            "border-red-300 text-red-900 placeholder-red-300"
    }

    let titleRef = React.createRef();

    // Declare and assign values for error state message values
    const errorStateValues = {
        titleError: " ",
    }

    // Create state modifiers
    const [formData, setFormData] = useState(initialState);
    const [errorData, setErrorData] = useState(errorState);
    const [errorDataValues, setErrorDataValues] = useState(errorStateValues);

    let [projectData, setProjectData] = useState("");

    useEffect(() => {
        setEditorMount(true);
    }, [])

    let save = async () => {
        await dispatch(addPost(formData.postTitle, projectData));
        clearPost();
        await dispatch(getPosts());
        showEditProjectDialog(false);
    }

    let clearPost = () => {
        setFormData({ ... formData, ["postTitle"]: ""});
        setEditorState( EditorState.createEmpty())
        if(editorState){
            setProjectData("");
        }
    }

    const handleOnChange = (e) => {
        setFormData({ ... formData, [e.target.name]: e.target.value});
        console.log(formData, e);
    }

    const _handleBeforeInput = () => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;

        if (currentContentLength > 140 - 1) {
            return 'handled';
        }
    }

    const _handlePasteInput = (text) => {
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;

        if (currentContentLength + text.length > 140 - 1) {
            return 'handled';
        }
    }

    let onEditorStateChange = (e) => {
        let tempProjectData = null;
        let formattedProjectData = null;
        setEditorState(e);
        if(editorState){
            tempProjectData = stateToHTML(editorState.getCurrentContent());
            formattedProjectData = tempProjectData.replace(/href/g, "target='_blank' href");
            setProjectData(formattedProjectData.toString());
        }
    };

    return (
        <Transition.Root show={dialogOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={showEditProjectDialog}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel style={{maxWidth:800}} className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-28 sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-100">
                                        <PencilSquareIcon className="h-6 w-6 text-slate-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            New Post
                                        </Dialog.Title>
                                        <div className="mt-2 py-2">
                                            <p className="text-sm text-gray-500">
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="post-title" className="block text-sm font-medium text-gray-900">
                                        {' '}
                                        Title{' '}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="postTitle"
                                            value={formData.postTitle}
                                            onChange={handleOnChange}
                                            ref={titleRef}
                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                                        />
                                        <div style={{visibility: errorData.nameError ? "visible" : "hidden"}}>
                                            <div className="items-center pointer-events-none" style={{position: "relative", bottom: "37px", right: "5px", float: "right"}}>
                                                <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                                            </div>
                                            <p className="mt-2 text-sm text-red-600" id="name-error">
                                                {errorDataValues.nameError}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {editorMount && (
                                    <Editor
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        handleBeforeInput={_handleBeforeInput}
                                        handlePastedText={_handlePasteInput}
                                        onEditorStateChange={onEditorStateChange}
                                        editorStyle={{minHeight: 300}}
                                    />
                                )}
                                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                                    <button
                                        type="button"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-800 text-base font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                                        onClick={() => save()}
                                    >
                                        Save
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                                        onClick={() => showEditProjectDialog(false)}
                                        ref={cancelButtonRef}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}