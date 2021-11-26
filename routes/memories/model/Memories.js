const mongoose = require("mongoose");

const MemorySchema = new mongoose.Schema({
    title: String,
    message:String,
    location : String,
    creatorName: {
        type: String,
    },
    creatorEmail: {
        type: String,
    },
    memoryImage: {
        type: String,
    },
    category: {
        type: String,
    },
    LikeCount:{
        type: Number,
        default: 0
    },
    CreatedAt:{
        type:Date,
        default : new Date()
    },
    comments: [{ type: mongoose.Schema.ObjectId, ref: "comment" }],
});

module.exports = mongoose.model("memory", MemorySchema);
