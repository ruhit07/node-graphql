import gql from "graphql-tag";

const sellerSchema = gql`
  input SellerInput {
    name: String!
    phone: String
    email: String
    address: String
  }

  input SellerArchive {
    archive: Boolean!
  }

  type SellerSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getSellers: [Seller]
    getSeller(_id: ID!): Seller!
  }

  type Mutation {
    createSeller(input: SellerInput): Seller!
    deleteSeller(_id: ID!): SellerSuccess!
    archiveSeller(_id: ID!, input: SellerArchive): Seller!
  }
`;

export default sellerSchema;
