import mongoose, { Types, Document, Model, Query } from "mongoose";
import { ICustomer } from "../types/types";

const customerSchema = new mongoose.Schema<ICustomer>({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  idBusiness: { type: mongoose.Schema.Types.ObjectId, ref: "Business" },
  subscribed: { type: Date, default: Date.now() },
});

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
