import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import allTypeDefs from "./schemas/index.js";
import allResolvers from "./resolvers/index.js";
import context from "./context/context.js";
import configEnv from "./config/config.js";

const server = new ApolloServer({
  typeDefs: allTypeDefs,
  resolvers: allResolvers,
  includeStacktraceInErrorResponses: false, // to exclude stack trace parameter from error messages
  introspection: true,
});

// Connect Databse Mongodb
const PORT = configEnv.PORT || 5000;
const MONGO_URI = configEnv.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB..");
    return startStandaloneServer(server, {
      listen: { port: PORT },
      context: context,
    });
  })
  .then((server) => {
    console.log(
      `Server Running in ${configEnv.NODE_ENV} mode On  ${server.url}`
    );
  });
