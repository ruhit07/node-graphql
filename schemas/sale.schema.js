import gql from "graphql-tag";

const saleSchema = gql`
  input SaleCreate {
    amount: Int!
    date: String!
    quantity: Int!
    product_id: String!
    customer_id: String!
  }

  input SaleUpdate {
    amount: Int
    date: String
    quantity: Int
    product_id: String
    customer_id: String
  }

  type SaleSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getSales(
      invoice_no: Int
      date: String
      customer_name: String
      product_name: String
    ): [Sale]
    getSale(_id: ID!): Sale!
  }

  type Mutation {
    createSale(input: SaleCreate): Sale!
    updateSale(_id: ID!, input: SaleUpdate): Sale!
    deleteSale(_id: ID!): SaleSuccess!
  }
`;

export default saleSchema;
