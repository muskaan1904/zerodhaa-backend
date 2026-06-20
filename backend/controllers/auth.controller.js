
const jwt = require("jsonwebtoken");
const UserModel = require("../model/UserModel");
const generateToken = require("../util/genToken");

// ---------------- SIGNUP ----------------
const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = await UserModel.create({
      username,
      email,
      password,
    });

    const token = generateToken(user._id);

    return res.status(201).json({
      message: "User Registered Successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        balance: user.balance,
      },
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};














// new

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = generateToken(user._id); // ✅ using utils

    return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })

      .json({
        message: "Signin successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          balance: user.balance,
        },
      });

  } catch (err) {
    console.log("SIGNIN ERROR:", err);
    return res.status(500).json({
      message: err.message,
    });
  }
};

// signout

// export const logout = async (req, res, next) => {
//     try {

//         return res.status(200)
//             .clearCookie("token", {
//                 httpOnly: true,
//                 secure: process.env.NODE_ENV === "development" ? false : true,
//                 sameSite: process.env.NODE_ENV === "development" ? "strict" : "none",
//             }).json({
//                 message: "logout successfully",
//             });

//     }
//     catch (err) {
//         return res.status(500).json({
//             message: err.message,
//         });
//     }
// };


const verifyToken = async (req, res) => {
  // If the middleware passed, the user is authenticated
  try {
    const user = await UserModel.findById(req.user._id).select("-password");
    return res.status(200).json({ user, token: req.cookies.token || req.headers.authorization?.split(" ")[1] });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Signup, signin, verifyToken };
