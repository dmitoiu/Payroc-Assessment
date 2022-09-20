// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// Portfolio (projectController.js) v1.0.0 10/07/2022
// A web application designed for a personal website
// -----------------------------------------------------------------------

// Importing libraries and utilities
var Post = require("../models/posts");
var mongoose = require("mongoose");

/**
 * Register
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addPost = async (req, res) => {
    try{
        console.log("Req: ", req);
        const title = req.body.title;
        const content = req.body.content;
        const members =
            {
                name: 'Darie-Dragoș Mitoiu',
                title: 'Software Engineer',
                department: 'Optimization',
                email: 'dmitoiu@hotmail.com',
                role: 'Member',
                href: '#',
                image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            };
        const projectExists = await Post.findOne({title});
        let errorProjectExists = "";
        if(projectExists){
            if(projectExists.title === title){
                errorProjectExists = "Post already exists in database,";
            }
            res.json({
                error: errorProjectExists
            });
        } else {
            const post = await Post.create({
                title,
                content,
                members
            })
            if(post){
                res.status(201).json({
                    _id: post._id,
                    title: post.title,
                    content: post.content,
                    members: post.members,
                })
            } else {
                res.send(404);
            }
        }

    } catch (e) {
        console.log(e);
    }
}

const getPostIndex = async () => {
    const count = await Post.countDocuments();
    let result = (parseInt(count) + 1).toString();
    let format = result.length < 3 ? pad("0" + result, 3) : result
    return format;
}

function pad (data, max) {
    data = data.toString();
    return data.length < max ? pad("0" + data, max) : data;
}

/**
 * Update Project
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const updatePost = async (req, res) => {
    try{
        const name = req.body.name;
        const description = req.body.description;
        const languages = req.body.languages;
        const category = req.body.category;
        const privacy = req.body.privacy;
        const isPinned = req.body.pinned;
        const color = req.body.color;
        const post = await Post.findOne({name: name});
        if(post){
            Post.findOneAndUpdate({name: name}, {
                $set: {
                    "name": name,
                    "description": description,
                    "languages": languages,
                    "category": category,
                    "privacy": privacy,
                    "isPinned": isPinned,
                    "color": color
                }},
                {new: true}, (err, doc) =>{
                    console.log(doc);
                    res.json(doc)
                })
            res.status(200)
        } else {
            res.json({
                error: "Project element is incorrect"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Reset the post
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const deletePost = async (req, res) => {
    try{
        const projectName = req.body.name;
        const project = await Post.findOne({name: projectName});
        if(project){
            Post.findOneAndUpdate({name: projectName}, {$set: {"archived": true}},
                {new: true}, (err, doc) =>{
                    console.log(doc);
                    res.json(doc)
                })
            res.status(200)
        } else {
            res.status(401).json({
                error: "Project element is incorrect"
            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Retrieves posts data
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getPosts = async (req, res) => {
    const posts = await Post.find({});
    res.json(posts);
}

const getPostById = async (req, res) => {
    if(mongoose.isValidObjectId(req.params.id)){
        const project = await Post.findById(req.params.id);
        if(project){
            res.json(project);
        } else {
            res.json({error: "Project not found."});
        }
    } else {
        res.json({error: "Project not found."});
    }
}

module.exports = {addPost, updatePost, getPosts, getPostById, deletePost};