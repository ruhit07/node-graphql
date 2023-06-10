import gql from "graphql-tag";

const sellerTypeDefs = gql`
  type Seller {
    _id: String
    name: String
    phone: String
    email: String
    address: String
    archive: Boolean
  }
`;
export default sellerTypeDefs;
