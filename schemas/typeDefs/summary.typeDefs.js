import gql from "graphql-tag";

const summaryTypeDefs = gql`
  type Summary {
    total_sale: Int!
    total_purchase: Int!
    total_profit: Int!
    best_selling_products: [BestProduct]
  }

  type BestProduct {
    _id: String
    qty: Int
  }
`;
export default summaryTypeDefs;
