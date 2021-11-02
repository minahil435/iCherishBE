const express = require("express");
const router = express.Router();
// const jwtMiddleware = require("../utils/jwtMiddleware");

const {
    saveComment,
    getAllComments,
    //     deleteRecipeById,
} = require("../comments/controller/commentsController")

router.get("/", (req, res) => {
    res.send("This Works")
})

router.get("/get-all-comments", getAllComments);
router.post("/save-comment", saveComment);
// router.post("/save-Post", jwtMiddleware, saveRecipe);
// router.delete("/delete-recipe-by-id/:id", jwtMiddleware, deleteRecipeById);


module.exports = router;