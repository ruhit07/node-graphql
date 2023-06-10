import PurchaseModel from "../models/purchase.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const purchaseResolver = {
  Query: {
    getPurchases: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const { invoice_no } = args;
      
      const reqQuery = {};
      if (invoice_no) reqQuery.invoice_no = invoice_no;

      try {
        const purchases = await PurchaseModel.find(reqQuery).populate([
          "product",
          "seller",
        ]);

        return purchases;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getPurchase: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const purchase = await PurchaseModel.findById(_id).populate([
          "product",
          "seller",
        ]);

        if (!purchase) {
          throwCustomError("Purchase not Found", ErrorTypes.NOT_FOUND);
        }

        return purchase;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createPurchase: async (_, { input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const { quantity, amount, date, product_id, seller_id } = input;

      const exist = await PurchaseModel.find()
        .sort({ invoice_no: -1 })
        .limit(1);

      const purchase = await PurchaseModel.create({
        invoice_no: exist.length ? Number(exist[0].invoice_no) + 1 : 1,
        quantity,
        amount,
        date,
        product: product_id,
        seller: seller_id,
      });

      const newPurchase = await PurchaseModel.findById({
        _id: purchase._doc._id,
      }).populate(["product", "seller"]);

      return newPurchase;
    },

    deletePurchase: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const purchase = await PurchaseModel.findById(_id);
      if (!purchase) {
        throwCustomError("Purchase not Found", ErrorTypes.NOT_FOUND);
      }

      const isDeleted = (await PurchaseModel.deleteOne({ _id })).deletedCount;

      return {
        isSuccess: isDeleted,
        message: "Purchase deleted successfully",
      };
    },

    updatePurchase: async (_, { _id, input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const { quantity, amount, date, product_id, seller_id } = input;

      const purchase = await PurchaseModel.findById(_id);
      if (!purchase) {
        throwCustomError("Purchase not Found", ErrorTypes.NOT_FOUND);
      }

      await PurchaseModel.updateOne(
        { _id },
        {
          quantity,
          amount,
          date,
          product: product_id,
          seller: seller_id,
        }
      );

      const newPurchase = await PurchaseModel.findById(_id).populate([
        "product",
        "seller",
      ]);

      return newPurchase;
    },
  },
};

export default purchaseResolver;
