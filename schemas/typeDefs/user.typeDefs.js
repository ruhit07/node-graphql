import gql from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    _id: String
    name: String
    email: String
    password: String
    role: String
  }
`;
export default userTypeDefs;
