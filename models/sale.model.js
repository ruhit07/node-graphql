import { Schema, model } from "mongoose";

const saleSchema = new Schema({
  invoice_no: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  amount: {
    type: Number,
  },
  date: {
    type: String,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

const SaleModel = model("Sale", saleSchema);
export default SaleModel;
