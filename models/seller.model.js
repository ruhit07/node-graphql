import { Schema, model } from "mongoose";

const sellerSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "please add a valid email",
    ],
  },
  address: {
    type: String,
  },
  archive: {
    type: Boolean,
    default: false,
  },
});

const SellerModel = model("Seller", sellerSchema);
export default SellerModel;
