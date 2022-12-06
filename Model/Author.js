const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
    },
    email: {
        type: String
    },
    bio: {
        type: String
    },
});

module.exports = mongoose.model("Author", AuthorSchema);
