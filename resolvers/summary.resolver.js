import PurchaseModel from "../models/purchase.model.js";
import SaleModel from "../models/sale.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const summaryResolver = {
  Query: {
    getSummary: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const [purchase] = await PurchaseModel.aggregate([
          {
            $group: {
              _id: null,
              total_purchase: { $sum: "$amount" },
            },
          },
        ]);

        const [sale] = await SaleModel.aggregate([
          {
            $group: {
              _id: null,
              total_sale: { $sum: "$amount" },
            },
          },
        ]);

        const best_selling_products = await SaleModel.aggregate([
          {
            $group: {
              _id: "$product",
              qty: { $sum: "$quantity" },
            },
          },
          { $sort: { qty: -1 } },
        ]);

        const total_purchase = purchase ? purchase.total_purchase : 0;
        const total_sale = sale ? sale.total_sale : 0;

        return {
          total_purchase,
          total_sale,
          total_profit: Number(total_purchase) - Number(total_sale),
          best_selling_products
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

export default summaryResolver;
