import SaleModel from "../models/sale.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const saleResolver = {
  Query: {
    getSales: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const { invoice_no, date, product_name, customer_name } = args;

      const reqQuery = {};
      const productQuery = {};
      const customerQuery = {};

      if (date) reqQuery.date = date;
      if (invoice_no) reqQuery.invoice_no = invoice_no;
      if (product_name) productQuery.name = product_name;
      if (customer_name) customerQuery.name = customer_name;

      try {
        const sales = await SaleModel.find(reqQuery)
          .populate({
            path: "product",
            match: productQuery,
          })
          .populate({
            path: "customer",
            match: customerQuery,
          });

        return sales;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getSale: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const sale = await SaleModel.findById(_id).populate([
          "product",
          "customer",
        ]);

        if (!sale) {
          throwCustomError("Sale not Found", ErrorTypes.NOT_FOUND);
        }

        return sale;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createSale: async (_, { input }) => {
      const { quantity, amount, date, product_id, customer_id } = input;

      const exist = await SaleModel.find().sort({ invoice_no: -1 }).limit(1);

      const sale = await SaleModel.create({
        invoice_no: exist.length ? Number(exist[0].invoice_no) + 1 : 1,
        quantity,
        amount,
        date,
        product: product_id,
        customer: customer_id,
      });

      const newSale = await SaleModel.findById({
        _id: sale._doc._id,
      }).populate(["product", "customer"]);

      return newSale;
    },

    deleteSale: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const sale = await SaleModel.findById(_id);
      if (!sale) {
        throwCustomError("Sale not Found", ErrorTypes.NOT_FOUND);
      }

      const isDeleted = (await SaleModel.deleteOne({ _id })).deletedCount;

      return {
        isSuccess: isDeleted,
        message: "Sale deleted successfully",
      };
    },

    updateSale: async (_, { _id, input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const { quantity, amount, date, product_id, customer_id } = input;

      const sale = await SaleModel.findById(_id);
      if (!sale) {
        throwCustomError("Sale not Found", ErrorTypes.NOT_FOUND);
      }

      await SaleModel.updateOne(
        { _id },
        {
          quantity,
          amount,
          date,
          product: product_id,
          customer: customer_id,
        }
      );

      const newSale = await SaleModel.findById(_id).populate([
        "product",
        "customer",
      ]);

      return newSale;
    },
  },
};

export default saleResolver;
