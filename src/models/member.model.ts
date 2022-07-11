import mongoose, { Types, Document, Model, Query } from "mongoose";
import { IMember } from "../types/types";

// email: string;
// userName: string;
// password: string;
// idBusiness: string[];
// createAccount: Date;
// avatar: string;
// numberPhone?: string;
// tiktok?: string;
// facebook?: string;
const memberSchema = new mongoose.Schema<IMember>({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
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
  numberPhone: {
    type: String,
  },
  tiktok: { type: String },
  facebook: { type: String },
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
