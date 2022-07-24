const jwt = require('jsonwebtoken');

const loginController = {
  login: (req, res) => {
    const {username, password} = req.body
    if(username === process.env.JWT_USERNAME && password === process.env.JWT_PASSWORD) {
      const token = jwt.sign({}, process.env.JWT_SECRET, {expiresIn: 600})
      return res.status(200).json({auth: true, token})
    }
    return res.sendStatus(401);
  },
}

module.exports = loginController;