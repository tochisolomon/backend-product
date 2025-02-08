const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter name"],
        },

        password: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },

        userName: {
            type: String,
            required: true,
            unique: true,
        },

        sex: {
            type: String,
            required: true,
        },

        maritalStatus: {
            type: String,
            required: true,
        },
    }, 
    {
        Timestamp: true,
    }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;