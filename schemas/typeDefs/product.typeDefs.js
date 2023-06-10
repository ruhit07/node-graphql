import gql from "graphql-tag";

const productTypeDefs = gql`
  type Product {
    _id: String
    name: String
    code: String
    archive: Boolean
  }
`;
export default productTypeDefs;
