import gql from "graphql-tag";

const customerSchema = gql`
  input CustomerInput {
    name: String!
    phone: String
    email: String
    address: String
  }

  input CustomerArchive {
    archive: Boolean!
  }

  type CustomerSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getCustomers: [Customer]
    getCustomer(_id: ID!): Customer!
  }

  type Mutation {
    createCustomer(input: CustomerInput): Customer!
    deleteCustomer(_id: ID!): CustomerSuccess!
    archiveCustomer(_id: ID!, input: CustomerArchive): Customer!
  }
`;

export default customerSchema;
