const Post = require("../model/Memories")
const User = require("../../user/model/User.js");
const Comment = require("../../comments/model/comments");

const getAllPosts = async (req, res) => {
    try {
 
        let payload = await Post.find({ category: req.query.category }).limit(30).sort({ LikeCount: 'descending' }).populate({
            path: "comments",
            model: Comment,
            select: "-__v",
        }).sort({ createdAt: 'descending' }).select("-__v ");
        res.json(payload);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const savePost = async (req, res) => {
    try {
        const { title, message, location, creatorName, category, creatorEmail } = req.body;
     
        const newPost = new Post ({
            title,
            message,
            location,
            creatorName,
            creatorEmail,
            category,
            memoryImage: req.file.path
        });

        const savedNewPost = await newPost.save();
        res.json(savedNewPost);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const likePost = async (req, res) => {
    try {
        const { _id, email} = req.body;
        const foundTargetUser = await User.findOne({ email: email})
        foundTargetUser.postArray.push(_id);
        await foundTargetUser.save();

        const foundTargetPost = await Post.findOne({ _id: _id })
        const filter = { _id: _id };
        const update = { LikeCount: foundTargetPost.LikeCount  + 1 };
        const opts = { new: true };

         await Post.findOneAndUpdate(filter, update, opts)    
        res.json("sucessful");
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const deletePostById = async (req, res, next) => {
    try {
        let deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.json({ message: "success", payload: deletedPost });
    } catch (e) {
        next(e);
    }
};

const getAllFavoritePosts = async (req, res) => {
    try {
        let payload = await User.find({ email: req.query.email })
            .populate({
                path: "postArray",
                model: Post,
                select: "-__v",
            })
            .select("-email -password  -__v -_id -userImage -userName");
        res.json(payload[0].postArray);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const getAllUserPosts = async (req, res) => {
    try {
        let payload = await Post.find({ creatorEmail: req.query.email , category: req.query.category }).sort({ LikeCount: 'descending' })
        console.log(payload)
        res.json(payload);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

module.exports = {
    getAllPosts,
    savePost,
    deletePostById,
    likePost,
    getAllFavoritePosts,
    getAllUserPosts
}
