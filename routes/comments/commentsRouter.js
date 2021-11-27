const express = require("express");
const router = express.Router();

const {
    saveComment
} = require("../comments/controller/commentsController")

router.post("/save-comment", saveComment);

module.exports = router;