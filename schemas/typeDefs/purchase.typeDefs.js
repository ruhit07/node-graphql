import gql from 'graphql-tag';

const purchaseTypeDefs = gql`
  type Purchase {
    _id: String
    invoice_no: Int
    quantity: Int
    amount: Int
    date: String
    product: Product
    seller: Seller
  }
`;
export default purchaseTypeDefs;