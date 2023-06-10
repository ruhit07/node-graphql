import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
  },
  code: {
    type: String,
    required: [true, "please enter product code"],
  },
  archive: {
    type: Boolean,
    default:false
  },
});


const ProductModel = model("Product", productSchema);
export default ProductModel;
