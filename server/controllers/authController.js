// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// RGU eShop (authController.js) v1.0.0 13/03/2021
// A web application designed for a ecommerce shop
// -----------------------------------------------------------------------

// Importing libraries and utilities
var Account = require("../models/account");
var jwt = require("jsonwebtoken");

/**
 * Generate user token
 * @param id
 * @returns {undefined|*}
 */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

/**
 * Log In
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const logInUser = async (req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const user = await Account.findOne({email});
        if(user && (await user.comparePassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
            res.status(200)
        } else {
            res.json({
                error: "Email or password is incorrect."
            })
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Register
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const registerUser = async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const userExists = await Account.findOne({email});
        let error = "";
        if(userExists){
            if(userExists.email === email){
                error += "email exists"
            }
            res.status(401).json({
                error: error
            });
        } else {
            const user = await Account.create({
                name,
                email,
                password
            })
            if(user){
                res.status(201).json({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user._id)
                })
            } else {
                res.send(404);
            }
        }

    } catch (e) {
        console.log(e);
    }
}

/**
 * Get User Details
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const getProfile = async (req, res) => {
    let user = await Account.findById(req.user._id);
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.send(404);
    }
    res.send("success");
}

module.exports = {logInUser, registerUser, getProfile};