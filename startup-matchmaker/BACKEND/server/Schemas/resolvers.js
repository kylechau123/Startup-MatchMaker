const { signToken } = require("../utils/auth");
const { User } = require("../models/");
const { GraphQLError } = require("graphql");

const resolvers = {
  Query: {
    me: async (_, __, ctx) => {
      const user = ctx?.user;
      if (!user?._id) {
        throw new GraphQLError("Token is either missing or invalid", {
          extensions: {
            code: "INVALID_TOKEN",
          },
        });
      }

      const foundUser = await User.findOne({
        // $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        _id: user._id,
      });

      if (!foundUser) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "NOT_FOUND",
          },
        });
      }

      return foundUser;
    },
  },
  Mutation: {
    async addUser(_, { registerInput }) {
      const user = await User.create(registerInput);

      if (!user) {
        throw new GraphQLError("Something went wrong", {
          extensions: {
            code: "SERVER_ERROR",
          },
        });
      }

      const token = signToken(user);
      return {
        token,
        user: { ...user._doc, bookCounts: 0 },
      };
    },
    async login(_, { loginInput }) {
      const user = await User.findOne({
        $or: [{ username: loginInput.email }, { email: loginInput.email }],
      });

      if (!user) {
        throw new GraphQLError("Can't find this user", {
          extensions: {
            code: "USER_NOT_FOUND",
            argumentName: "email",
          },
        });
      }

      const correctPw = await user.isCorrectPassword(loginInput.password);

      if (!correctPw) {
        throw new GraphQLError("Wrong password!", {
          extensions: {
            code: "INCORRECT_PASSWORD",
            argumentName: "password",
          },
        });
      }
      const token = signToken(user);

      return {
        token,
        user: { ...user._doc, bookCounts: 0 },
      };
    },

    async saveBook(_, { saveBookInput }, ctx) {
      const user = ctx?.user;

      if (!user?._id) {
        throw new GraphQLError("Token is either missing or invalid", {
          extensions: {
            code: "INVALID_TOKEN",
          },
        });
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $addToSet: { savedBooks: saveBookInput } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      } catch (err) {
        console.log(err);
        throw new GraphQLError(err.message, {
          extensions: {
            code: "FAILED",
          },
        });
      }
    },

    async removeBook(_, { removeBookInput }, ctx) {
      const user = ctx?.user;

      if (!user?._id) {
        throw new GraphQLError("Token is either missing or invalid", {
          extensions: {
            code: "INVALID_TOKEN",
          },
        });
      }
      try {
        const updatedUser = await User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedBooks: { bookId: removeBookInput.bookId } } },
          { new: true }
        );
        if (!updatedUser) {
          throw new GraphQLError("Couldn't find user with this id!", {
            extensions: {
              code: "NOT_FOUND",
            },
          });
        }
        return updatedUser;
      } catch (err) {
        console.log(err);

        throw new GraphQLError(err.message, {
          extensions: {
            code: "FAILED",
          },
        });
      }
    },
  },
};

module.exports = resolvers;
