const { User } = require("../user/model");
const { Product } = require("../products/model.js");
const bcrypt = require("bcrypt");
const { OTP_EMAIL } = require("./const");
const session = require('express-session');
const { sendEmail, generateOTP } = require("../utilitis/sendEmail.js");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const salt = bcrypt.genSaltSync(10);

// ✅ Create a new user
const createOne = async (req, res) => {
  try {
    const { username, email, password, gender, phone, address, dateOfBirth } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, msg: "Username, email, and password are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }, { phone }] });
    if (existingUser) {
      return res.status(409).json({ success: false, msg: "User already exists with given email, username, or phone" });
    }

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      gender,
      phone,
      address,
      dateOfBirth,
    });

    return res.status(201).json({ success: true, msg: "User created successfully", data: newUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error creating user" });
  }
};

// ✅ Get all users (excluding password) with optional product info
const getAll = async (req, res) => {
  try {
    const users = await User.find().select("-__v -password").populate("products", "name price");
    return res.json({ success: true, data: users });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error retrieving users" });
  }
};

// ✅ Get user by ID (with products)
const getOne = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!ObjectId.isValid(userID)) {
      return res.status(400).json({ success: false, msg: "Invalid user ID" });
    }

    const user = await User.findById(userID)
      .select("-__v -password")
      .populate("products", "name description price");

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error retrieving user" });
  }
};

// ✅ Update user by ID
const updateOne = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!ObjectId.isValid(userID)) {
      return res.status(400).json({ success: false, msg: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(userID, req.body, {
      new: true,
      runValidators: true,
    }).select("-__v -password");

    if (!updatedUser) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.json({ success: true, msg: "User updated", data: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error updating user" });
  }
};

// ✅ Delete user by ID and optionally delete their products
const deleteOne = async (req, res) => {
  try {
    const { userID } = req.params;

    if (!ObjectId.isValid(userID)) {
      return res.status(400).json({ success: false, msg: "Invalid user ID" });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Delete all products owned by this user
    await Product.deleteMany({ _id: { $in: user.products } });

    // Delete user
    await User.findByIdAndDelete(userID);

    return res.json({ success: true, msg: "User and their products deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Error deleting user" });
  }
};

// ✅ Login (using session)
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: user not found for email", email);
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("User provided:", password);
    console.log("Stored password:", user.password);
    console.log("Match?", isMatch);

    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    return res.json({
      success: true,
      msg: "Logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, msg: "Login error" });
  }
};


// ✅ Logout (using session)
const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ success: false, msg: "Logout failed" });
    }
    res.clearCookie('connect.sid');
    return res.json({ success: true, msg: "Logged out successfully" });
  });
};

// ✅ Reset Password
const resetPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  if (!user) return res.json({ msg: 'User not found' });

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) return res.json({ msg: 'Old password not matched' });

  const hashedNewPassword = await bcrypt.hash(newPassword, salt); 
  user.password = hashedNewPassword;
  await user.save();

  return res.json({ msg: 'Password reset successfully' });
};

// ✅ Send OTP
const sendOtp = async (req, res) => {
  const { email, username } = req.body;
  const user = await User.findOne({ email, username });
  if (!user) return res.json({ msg: 'User not found' });

  const OTP = generateOTP(); 
  const msg = OTP_EMAIL.html1 + OTP + OTP_EMAIL.html2;
  await sendEmail(email, 'OTP_SEND', msg);
  
  return res.json({ msg: 'OTP sent' });
};

// forgot password
const forgotPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.json({ msg: 'User not found' });
  
  
  if (!otp && !newPassword) {
    const OTP = generateOTP();
    user.resetOtp = OTP;
    user.otpExpires = Date.now() + 10 * 60 * 1000;
    await user.save();

    const msg = OTP_EMAIL.html1 + OTP + OTP_EMAIL.html2;
    await sendEmail(email, 'Your OTP', msg);
    return res.json({ msg: 'OTP sent to your email' });
  }


  // if (otp && newPassword) {
  //   if (user.resetOtp !== otp || Date.now() > user.otpExpires) {
  //     return res.json({ msg: 'Invalid or expired OTP' });
  //   } 

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    
    user.resetOtp = null;
    user.otpExpires = null;
    await user.save();

    return res.json({ msg: 'Password reset successfully' });
  };

  


module.exports = {
  createOne,
  getAll,
  getOne,
  updateOne,
  deleteOne,
  login,
  logout,
  resetPassword,
  sendOtp,
  forgotPassword,
};