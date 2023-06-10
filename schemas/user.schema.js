import gql from "graphql-tag";

const userSchema = gql`
  input SignupInput {
    name: String!
    email: String!
    password: String!
    role: String!
  }

  input SigninInput {
    email: String!
    password: String!
  }

  type JwtToken {
    token: String!
  }

  type UserWithToken {
    _id: String
    name: String
    email: String
    role: String
    userJwtToken: JwtToken
  }

  type Query {
    getUsers: [User]
    getUser(_id: ID!): User!
  }

  type Mutation {
    signup(input: SignupInput): UserWithToken
    signin(input: SigninInput): UserWithToken
  }
`;

export default userSchema;
