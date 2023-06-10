import gql from "graphql-tag";

const purchaseSchema = gql`
  input PurchaseCreate {
    amount: Int!
    date: String!
    quantity: Int!
    product_id: String!
    seller_id: String!
  }

  input PurchaseUpdate {
    amount: Int
    date: String
    quantity: Int
    product_id: String
    seller_id: String
  }

  type PurchaseSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getPurchases(invoice_no: Int): [Purchase]
    getPurchase(_id: ID!): Purchase!
  }

  type Mutation {
    createPurchase(input: PurchaseCreate): Purchase!
    updatePurchase(_id: ID!, input: PurchaseUpdate): Purchase!
    deletePurchase(_id: ID!): PurchaseSuccess!
  }
`;

export default purchaseSchema;
