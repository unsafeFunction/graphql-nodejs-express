const bcrypt = require("bcrypt");

const hashPassword = password => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

const validatePassword = async (inputPassword, storedPassword) => {
  const isPasswordValid = await bcrypt.compare(inputPassword, storedPassword);

  return isPasswordValid;
};

module.exports = {
  hashPassword,
  validatePassword
};
