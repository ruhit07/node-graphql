import CustomerModel from "../models/customer.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const customerResolver = {
  Query: {
    getCustomers: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const customers = await CustomerModel.find();
        return customers;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getCustomer: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const customer = await CustomerModel.findById(_id);
        if (!customer) {
          throwCustomError("Customer not Found", ErrorTypes.NOT_FOUND);
        }

        return customer;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createCustomer: async (_, { input }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const customer = await CustomerModel.create(input);
      return {
        ...customer._doc,
      };
    },

    deleteCustomer: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const customer = await CustomerModel.findById(_id);
      if (!customer) {
        throwCustomError("Customer not Found", ErrorTypes.NOT_FOUND);
      }

      const isDeleted = (await CustomerModel.deleteOne({ _id })).deletedCount;

      return {
        isSuccess: isDeleted,
        message: "Customer deleted successfully",
      };
    },

    archiveCustomer: async (_, { _id, input: { archive } }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      const customer = await CustomerModel.findById(_id);
      if (!customer) {
        throwCustomError("Customer not Found", ErrorTypes.NOT_FOUND);
      }

      await CustomerModel.updateOne({ _id }, { archive });

      return { ...customer._doc, archive };
    },
  },
};

export default customerResolver;
