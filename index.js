const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    books: [Book]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    getBooks: [Book]
    getAuthors: [Author]
  }
`;

const books = [
  {
    title: "Harry Potter and the Chamber of Secrets",
    author: {
      name: "JFROMMM"
    }
  },
  {
    title: "Jurassic Park",
    author: {
      name: "VRAUUUUU"
    }
  }
];

const authors = [
  {
    name: "J.K. Rowling",
    books: [
      {
        title: "Harry Potter and the Chamber of Secrets",
        author: "J.K. Rowling"
      },
      {
        title: "Jurassic Park",
        author: {
          name: "VRAUUUUU"
        }
      }
    ]
  },
  {
    name: "Felipe Muner",
    books: [
      {
        title: "qwe",
        author: {
          name: "VRAUUUUU"
        }
      }
    ]
  },
  {
    name: "Monteiro Lobato",
    books: [
      {
        title: "123",
        author: {
          name: "VRAUUUUU"
        }
      },
      {
        title: "890",
        author: {
          name: "VRAUUUUU"
        }
      }
    ]
  }
];

const resolvers = {
  Query: {
    getBooks: () => books,
    getAuthors: () => authors
  }
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});