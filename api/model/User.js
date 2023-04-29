const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: [5, "Type your full name."],
        max: [50, "Please shorten your name."],
        unique: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, 'Email address is required.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.']
    },
    password: {
        type: String,
        min: [6, 'Must be more than five letters.'],
        required: [true, 'Please enter your password?']
    },
    refreshToken: {
        type: String,
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User