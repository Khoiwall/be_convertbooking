import mongoose, { Types, Document, Model, Query } from "mongoose";

import { IBusiness } from "../types/types";

const businessSchema = new mongoose.Schema<IBusiness>(
  {
    idUser: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    companyOrOrganization: { type: String, required: true },
    webUrl: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    timeZone: { type: String, required: true },
    career: { type: String, required: true },
    interests: [{ type: String, required: true }],
    subscribers: { type: Boolean, required: true },
    toolSub: {
      news: { type: String, required: true },
      numberSub: { type: String, required: true },
      collectSub: [{ type: String, required: true }],
    },
    tool: {
      emailMarketing: { type: Boolean, required: true },
      platformEmailMarketing: { type: String, required: true },
      digitalProduct: { type: Boolean, required: true },
      platformDigitalProduct: { type: String, required: true },
      webBuilder: { type: Boolean, required: true },
      platformWebBuilder: { type: String, required: true },
    },
    plan: {
      type: String,
      enum: ["free", "pro", "premium"],
      default: "free",
      select: false,
    },
  },
  { timestamps: true }
);
const Business = mongoose.model("Business", businessSchema);

export default Business;
