import SellerModel from "../models/seller.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const sellerResolver = {
  Query: {
    getSellers: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const sellers = await SellerModel.find();
        return sellers;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getSeller: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const seller = await SellerModel.findById(_id);
        if (!seller) {
          throwCustomError("Seller not Found", ErrorTypes.NOT_FOUND);
        }

        return seller;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createSeller: async (_, { input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const seller = await SellerModel.create(input);
      return {
        ...seller._doc,
      };
    },

    deleteSeller: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const seller = await SellerModel.findById(_id);
      if (!seller) {
        throwCustomError("Seller not Found", ErrorTypes.NOT_FOUND);
      }

      const isDeleted = (await SellerModel.deleteOne({ _id })).deletedCount;

      return {
        isSuccess: isDeleted,
        message: "Seller deleted successfully",
      };
    },

    archiveSeller: async (_, { _id, input: { archive } }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const seller = await SellerModel.findById(_id);
      if (!seller) {
        throwCustomError("Seller not Found", ErrorTypes.NOT_FOUND);
      }

      await SellerModel.updateOne({ _id }, { archive });

      return { ...seller._doc, archive };
    },
  },
};

export default sellerResolver;
