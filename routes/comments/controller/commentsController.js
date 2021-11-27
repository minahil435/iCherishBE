const Comment = require("../model/comments");
const Post = require("../../memories/model/Memories");

const saveComment = async (req, res) => {
    try {
        
        const { comment, creatorName, creatorImage, postId } = req.body;
    
        const newComment = new Comment({
            comment,
            creatorName,
            creatorImage
        });

        const savedNewComment = await newComment.save()
        const foundTargetPost = await Post.findOne({ _id: postId })
        foundTargetPost.comments.push(savedNewComment._id);
        await foundTargetPost.save();
        res.json(savedNewComment);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};


module.exports = {
    saveComment,
}
