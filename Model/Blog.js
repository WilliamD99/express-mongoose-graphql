const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
    },
    updatedAt: {
        type: String
    },
    category: {
        type: String
    },
    excerpt: {
        type: String
    },
    authorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Blog", BlogSchema);
