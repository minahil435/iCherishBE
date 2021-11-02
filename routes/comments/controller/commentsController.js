const Comment = require("../model/comments");
const Post = require("../../memories/model/Memories");


const getAllComments = async (req, res) => {
    try {
           let payload = await Post.findOne({ _id : req.params.id })
            .populate({
                path: "comment",
                model: Comment,
                select: "-__v",
            })
            .select("-__v -_id");
            
        console.log(payload)
        res.json(payload);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const saveComment = async (req, res) => {
    try {
 
        const { comment, creatorEmail, creatorName, creatorImage, postId } = req.body;
    
        const newComment = new Comment({
            comment,
            creatorEmail,
            creatorName,
            creatorImage
        });

        const savedNewComment= await newComment.save();
        
        const foundTargetPost = await Post.findOne({ _id: postId })
        foundTargetPost.comments.push(savedNewComment._id);
        await foundTargetPost.save();

        res.json(savedNewComment);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};


// const deleteRecipeById = async (req, res, next) => {
//     try {
//         let deletedRecipe = await Recipe.findByIdAndRemove(req.params.id);

//         const { decodedJwt } = res.locals;
//         let foundUser = await User.findOne({ email: decodedJwt.email });
//         let foundUserArray = foundUser.recipes;
//         let filteredRecipesArray = foundUserArray.filter((id) => {
//             id.toString() !== deletedRecipe._id.toString();
//         });

//         foundUser.recipes = filteredRecipesArray;
//         await foundUser.save();

//         res.json({ message: "success", payload: deletedRecipe });
//     } catch (e) {
//         next(e);
//     }
// };

module.exports = {
    getAllComments,
    saveComment,
    //     deleteRecipeById,
}
