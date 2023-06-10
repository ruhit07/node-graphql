import gql from 'graphql-tag';

const customerTypeDefs = gql`
  type Customer {
    _id: String
    name: String
    phone: String
    email: String
    address: String
    archive: Boolean
  }
`;
export default customerTypeDefs;
