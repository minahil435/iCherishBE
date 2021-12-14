const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

async function signup(req, res, next) {
  const { email, password, userName } = req.body;
  const { errorObj } = res.locals;


  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = new User({
      email,
      password: hashedPassword,
      userImage: req.file.path,
      userName
    });

    let newUser = await createdUser.save();

    let jwtToken = jwt.sign(
      {
        email: newUser.email,
        userImage: newUser.userImage,
        userName: newUser.userName,
        postArray: newUser.postArray
      },
      process.env.PRIVATE_JWT_KEY,
      {
        expiresIn: "3d",
      }
    );

    res.json({ message: "success", payload: jwtToken });

  } catch (e) {
    console.log(e)
    next(e);
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  const { errorObj } = res.locals;

  if (Object.keys(errorObj).length > 0) {
    return res.status(500).json({ message: "failure", payload: errorObj });
  }

  try {
    let foundUser = await User.findOne({ email: email });

    if (!foundUser) {
      res.status(400).json({
        message: "failure",
        payload: "Please check your email and password",
      });
    } else {
      let comparedPassword = await bcrypt.compare(password, foundUser.password);

      if (!comparedPassword) {
        res.status(400).json({
          message: "failure",
          payload: "Please check your email and password",
        });
      } else {
        console.log(foundUser)
        let jwtToken = jwt.sign(
          {
            email: foundUser.email,
            userName: foundUser.userName,
            userImage: foundUser.userImage,
            postArray: foundUser.postArray
          },
          process.env.PRIVATE_JWT_KEY,
          {
            expiresIn: "3d",
          }
        );

        res.json({ message: "success", payload: jwtToken });
      }
    }
  } catch (e) {
    res.json({ message: "error", error: e });
  }
}

const getLikedPostArray = async (req, res) => {
  try {
    const foundTargetUser = await User.findOne({ email: req.query.email });
    res.json(foundTargetUser.postArray);
  } catch (e) {
    res.status(500).json({ e: e, message: e.message });
  }
};


module.exports = { signup, login, getLikedPostArray};
