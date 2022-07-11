import mongoose, { Types, Document, Model, Query } from "mongoose";
import { IVideo } from "../types/types";

const videoSchema = new mongoose.Schema<IVideo>({
  urlVideo: { type: String, required: true },
  idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  idCustomer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  upload: { type: Date, default: Date.now },
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
