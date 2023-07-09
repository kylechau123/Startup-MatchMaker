module.exports = `#graphql
  type Book {
    bookId: String
    title: String
    description: String
    authors: [String]
    image: String
    link: String
  }

  type User {
    _id: String
    username: String
    email: String
    bookCounts: Int
    savedBooks: [Book]
  }

  type Auth {
    token: String,
    user: User
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    bookId: String
    title: String
    description: String
    authors: [String]
    image: String
    link: String
  }

  input RemoveBookInput {
    bookId: String
  }

  type Query {
    me: User
  }

  type Mutation {
    login(loginInput: LoginInput!): Auth!
    addUser(registerInput: RegisterInput!): Auth!
    saveBook(saveBookInput: SaveBookInput!): User!
    removeBook(removeBookInput: RemoveBookInput!): User!
  }
`;
