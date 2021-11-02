const express = require("express");
const router = express.Router();
const multer = require("multer")
const jwtMiddleware = require("../utils/jwtMiddleware");

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') { cb(null, false) }
    else { cb(null, true) }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Postuploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage, limits: { filesize: 1024 * 1024 * 5 } })

const {
    savePost,
    getAllPosts,
//     deleteRecipeById,
//     alreadylikedRecipe
} = require("../memories/controller/memoriesController")

router.get("/",(req,res) => {
    res.send("This Works")
})
router.get("/get-all-Posts", getAllPosts);
// router.post("/save-Post", jwtMiddleware, saveRecipe);
router.post("/save-Post", upload.single('postImage'),savePost);
// router.delete("/delete-recipe-by-id/:id", jwtMiddleware, deleteRecipeById);
// router.post("/already-liked-Recipe", jwtMiddleware, alreadylikedRecipe)

module.exports = router;