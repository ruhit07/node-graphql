import ProductModel from "../models/product.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const productResolver = {
  Query: {
    getProducts: async () => {
      try {
        const products = await ProductModel.find();
        return products;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getProduct: async (_, { _id }) => {
      try {
        const product = await ProductModel.findById(_id);
        if (!product) {
          throwCustomError("Product not Found", ErrorTypes.NOT_FOUND);
        }

        return product;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createProduct: async (_, { input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const product = await ProductModel.create(input);
      return {
        ...product._doc,
      };
    },

    deleteProduct: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const product = await ProductModel.findById(_id);
      if (!product) {
        throwCustomError("Product not Found", ErrorTypes.NOT_FOUND);
      }

      const isDeleted = (await ProductModel.deleteOne({ _id })).deletedCount;

      return {
        isSuccess: isDeleted,
        message: "Product deleted successfully",
      };
    },

    archiveProduct: async (_, { _id, input: { archive } }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const product = await ProductModel.findById(_id);
      if (!product) {
        throwCustomError("Product not Found", ErrorTypes.NOT_FOUND);
      }

      await ProductModel.updateOne({ _id }, { archive });

      return { ...product._doc, archive };
    },
  },
};

export default productResolver;
