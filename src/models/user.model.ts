import mongoose, { Types, Document, Model, Query } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../types/types";

interface IUserDocument extends IUser, Document {
  isCorrectPassword: (enterPassword: string) => Promise<boolean>;
}
interface IUserModel extends Model<IUserDocument> {}
const emailRegex: RegExp =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    userName: { type: String, required: [true, "Please input your username"] },
    email: {
      type: String,
      required: [true, "Please fill your email address"],
      unique: true,
      validate: {
        validator: function (this: IUser): boolean {
          return emailRegex.test(this.email);
        },
        message: "Email must be a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Please fill your password"],
      trim: true,
      minLength: [8, "Password must be at least 8 characters"],
      maxlength: [16, "Password must be at most 16 characters "],
      select: false, // can't not see this field when query
      selected: false,
    },
    avatar: {
      type: String,
      default:
        "https://i1.wp.com/dashboard.mailerlite.com/images/user-default.png?ssl=1",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      select: false,
      message: "Invalid role",
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dnyieivv3/image/upload/v1654421839/Radio_Image/default_avatar_mofobi.png",
    },
    business: [{ type: mongoose.Schema.Types.ObjectId, ref: "Business" }],
  },
  { timestamps: true }
);

// Pre Save User
userSchema.pre("save", async function (next): Promise<void> {
  // only run when password modified
  if (!this.isModified("password")) return next();
  // hash password,
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// User Methods
userSchema.methods.isCorrectPassword = async function (
  this: IUser,
  enterPassword: string
): Promise<boolean> {
  const result = await bcrypt.compare(enterPassword, this.password);
  return result;
};
const User = mongoose.model<IUserDocument, IUserModel>("User", userSchema);

export default User;
