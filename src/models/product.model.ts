import mongoose, { Types, Document, Model, Query } from "mongoose";
import { IProduct } from "../types/types";

const productSchema = new mongoose.Schema<IProduct>({
  nameProduct: { type: String, required: true },
  IdBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  images: [{ type: String }],
  price: { type: Number, required: true },
  // status: { type: Boolean, required: true },
  createDate: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
