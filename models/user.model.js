import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your  name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "please enter your email"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    required: [true, "please add a role"],
    enum: ["Admin", "Employee"],
  },
});

// Encrypt password using bcrypt
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Match User entered password to hashed in database
userSchema.methods.matchPassword = async function (enterdPassword) {
  return await bcrypt.compare(enterdPassword, this.password);
};

const UserModel = model("User", userSchema);
export default UserModel;
