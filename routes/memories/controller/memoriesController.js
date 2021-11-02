const Post = require("../model/Memories")


const getAllPosts = async (req, res) => {
    try {
        const { category , limit } = req.body;
        let limiter = parseInt(limit, 10)
        let payload = await Post.find({ category: category }).limit(limiter).sort({ LikeCount: 'descending' })
        console.log(payload)
        res.json(payload);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};

const savePost = async (req, res) => {
    try {
        const { title, message, creatorName, category, creatorEmail } = req.body;
        console.log(req.body)

        const newPost = new Post ({
            title,
            message,
            creatorName,
            creatorEmail,
            category,
            momoryImage: req.file.path
        });

        const savedNewPost = await newPost.save();
        //when you saved a friend - an ID is created from the databse
        // const { decodedJwt } = res.locals;
        // console.log(res.locals);
        //now we have to find the user ID
        // const foundTargetUser = await User.findOne({ email: decodedJwt.email })

        // foundTargetUser.recipes.push(savedNewRecipe._id);

        // await foundTargetUser.save();

        res.json(savedNewPost);
    } catch (e) {
        res.status(500).json({ e: e, message: e.message });
    }
};


// const alreadylikedRecipe = async (req, res) => {
//     try {
//         const { idMeal } = req.body;
//         console.log("hi", req.body.idMeal)
//         const { decodedJwt } = res.locals;
//         const foundTargetUser = await User.findOne({ email: decodedJwt.email }).populate({
//             path: "recipes",
//             model: Recipe,
//             select: "-__v",
//         })
//             .select("-firstName -lastName -__v -_id ");

//         let found = false

//         foundTargetUser.recipes.forEach(element => {
//             console.log(element.idMeal)
//             if (element.idMeal === idMeal) {
//                 found = true
//             }
//         });

//         res.json({ message: "success", payload: found });
//     } catch (e) {
//         res.status(500).json({ e: e, message: e.message });
//     }
// };



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
    getAllPosts,
    savePost,
//     deleteRecipeById,
//     alreadylikedRecipe
}
