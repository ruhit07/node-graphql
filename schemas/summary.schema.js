import gql from "graphql-tag";

const summarySchema = gql`
  type Query {
    getSummary: Summary!
  }
`;

export default summarySchema;
