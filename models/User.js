import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const { isEmail } = validator;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a name"],
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    required: true,
    minlength: [6, "Minimum password length is 6 characters"]
  },
  img: {
    type: String,
  },
  subscribers: {
    type: Number,
    default: 0,
  },
  subscribedUsers: {
    type: [String],
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  }

}, {
  timestamps: true,
})

//Hash password before saving
UserSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next()
})

const User = mongoose.model("user", UserSchema);
export default User;