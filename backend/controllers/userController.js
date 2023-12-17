import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js" 

//@desc Auth user & get token
//@route POST  /api/users/login
//@access Public
const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  // แตกค่าตัวแปร req.body เป็นตัวแปร email กับ password
  const { email, password } = req.body;

  // mango model หา email
  const user = await User.findOne({ email });

  // ถ้าพบ email นี้และมี object user ให้แตกค่าลงตัวแปร
  // user object อ้างถึง method ใน  User Model
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // ถ้าไม่พบ email ให้แสดง error message
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register user
//@route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExit = await User.findOne({ email });

  if (userExit) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // หลังจาก create user แล้ว object user จะไม่ว่าง
  // ทำการตรวจสอบ ถ้ามี object user
  if (user) {
    generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  //res.send("register user");
});

//@desc Logout user / clear cookie
//@route POST /api/users/logout
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged Out Successfully  " });
});

//@desc Get user profile
//@route GET /api/users/profile
//@access Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//@route PUT /api/users/profile
//@access Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }else{
    res.status(400);
    throw new Error("User not found");
  }

  res.send("update user profile");
});

//@desc Update user
//@route GET /api/users
//@access Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc GET user by id
//@route GET /api/users/:id
//@access Private/Admin

const getUserById = asyncHandler(async (req, res) => {
  res.send("get user by ID");
});

//@desc delete user
//@route DELETE /api/users/:id
//@access Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc Update user
//@route PUT /api/users:id
//@access Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send("update user by Id");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};