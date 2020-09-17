const bcrypt = require("bcrypt");

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

const validatePassword = (userPassword, storedPassword) => {
  return bcrypt.compareSync(password, storedPassword);
};

module.exports = {
  hashPassword,
  validatePassword
};
