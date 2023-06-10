import UserModel from "../models/user.model.js";
import throwCustomError, {
  ErrorTypes,
} from "../helpers/error-handler.helper.js";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    getUsers: async (_, args, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const users = await UserModel.find();
        return users;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getUser: async (_, { _id }, context) => {
      if (context.user?.role !== "Admin") {
        throwCustomError("User not Authorised", ErrorTypes.UNAUTHENTICATED);
      }

      try {
        const user = await UserModel.findById(_id);
        if (!user) {
          throwCustomError("User not Found", ErrorTypes.NOT_FOUND);
        }

        return user;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    signup: async (_, { input }) => {
      const { name, email, password, role } = input;

      const isUserExists = await UserModel.findOne({ email: email });
      if (isUserExists) {
        throwCustomError(
          "Email is already Registered",
          ErrorTypes.ALREADY_EXISTS
        );
      }

      const user = await UserModel.create({
        email,
        password,
        name,
        role,
      });

      const token = user.getSignedJwtToken();

      return {
        ...user._doc,
        userJwtToken: {
          token: token,
        },
      };
    },

    signin: async (_, { input }) => {
      const { email, password } = input;

      // Check for user
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) {
        throwCustomError("Invalid Input", ErrorTypes.BAD_USER_INPUT);
      }
      
      // Check password matches
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        throwCustomError(
          "User is not Authenticated",
          ErrorTypes.UNAUTHENTICATED
        );
      }

      const token = await user.getSignedJwtToken();
      return {
        ...user._doc,
        userJwtToken: {
          token: token,
        },
      };
    },
  },
};

export default userResolver;
