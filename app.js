var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

require("dotenv").config();
var mongoose = require("mongoose");
const ErrorMessageHandlerClass = require("./routes/utils/ErrorMessageHandlerClass");
const errorController = require("./routes/utils/errorController");
const memoriesRouter = require("./routes/memories/memoriesRouter");
const userRouter = require("./routes/user/userRouter");

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((e) => {
        console.log(e);
    });

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/uploads', express.static('uploads'));
app.use("/api/memories", memoriesRouter)
app.use("/api/user", userRouter)

app.all("*", function (req, res, next) {
    next(
        new ErrorMessageHandlerClass(
            `Cannot find ${req.originalUrl} on this server! Check your URL`,
            404
        )
    );
});

app.use(errorController);
module.exports = app;
