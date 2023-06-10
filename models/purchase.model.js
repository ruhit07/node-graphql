import { Schema, model } from "mongoose";

const purchaseSchema = new Schema({
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
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
});

const PurchaseModel = model("Purchase", purchaseSchema);
export default PurchaseModel;
