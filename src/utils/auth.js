const jsonwebtoken = require("jsonwebtoken");

const generateToken = (payload, expiresIn) => {
  const token = jsonwebtoken.sign(
    {
      ...payload
    },
    process.env.JWT_SECRET,
    { expiresIn }
  );

  return token;
};

module.exports = generateToken;
