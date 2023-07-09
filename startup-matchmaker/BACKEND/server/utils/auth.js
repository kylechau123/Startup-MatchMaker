const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '30d';

module.exports = {
  // function for our authenticated routes
  getUser: function (token) {
    // ["Bearer", "<tokenvalue>"]
    if (!token) return;
    token = token.split(' ').pop().trim();
    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      return data;
    } catch (err) {
      console.log(token, 'Invalid token', err);
    }
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
