const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.headers.authorization
  const payload = jwt.verify(token, process.env.JWT_TOKEN)
  req.userId = payload.userId
  next();
}

module.exports = auth;