// -----------------------------------------------------------------------
// Darie-Dragos Mitoiu
// TwtiStips (userModel.js) v1.0.0 01/07/2022
// A web application designed for a personal use
// -----------------------------------------------------------------------

// Importing libraries and utilities
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

// Create user schema
const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

/**
 * Compare given password with hashed password
 * @param password
 * @returns {Promise<boolean>}
 */
accountSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

/**
 * Hash the user password
 */
accountSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// Create User model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;