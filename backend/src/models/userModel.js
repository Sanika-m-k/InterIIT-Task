const bcrypt = require('bcryptjs');

const user = {
  email: "user@example.com",
  password: bcrypt.hashSync("password123", 10), 
  checkEmailDomain: (email) => {
    const domain = email.split('@')[1];
    return domain === 'test.com';  // Example domain check
  }
};

module.exports = user;
