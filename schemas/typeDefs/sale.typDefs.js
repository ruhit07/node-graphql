import gql from "graphql-tag";

const saleTypeDefs = gql`
  type Sale {
    _id: String
    invoice_no: Int
    quantity: Int
    amount: Int
    date: String
    product: Product
    customer: Customer
  }
`;
export default saleTypeDefs;
