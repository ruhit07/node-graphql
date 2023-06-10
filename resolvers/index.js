import customerResolver from "./customer.resolver.js";
import productResolver from "./product.resolver.js";
import purchaseResolver from "./purchase.resolver.js";
import saleResolver from "./sale.resolver.js";
import sellerResolver from "./seller.resolver.js";
import summaryResolver from "./summary.resolver.js";
import userResolver from "./user.resolver.js";

export default [
  userResolver,
  productResolver,
  customerResolver,
  sellerResolver,
  purchaseResolver,
  saleResolver,
  summaryResolver
];
