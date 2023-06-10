import gql from "graphql-tag";

const productSchema = gql`
  input ProductInput {
    name: String!
    code: String!
  }

  input ProductArchive {
    archive: Boolean!
  }

  type ProductSuccess {
    isSuccess: Boolean
    message: String!
  }

  type Query {
    getProducts: [Product]
    getProduct(_id: ID!): Product!
  }

  type Mutation {
    createProduct(input: ProductInput): Product!
    deleteProduct(_id: ID!): ProductSuccess!
    archiveProduct(_id: ID!, input: ProductArchive): Product!
  }
`;

export default productSchema;
