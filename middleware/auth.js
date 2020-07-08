const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //get token from the header
  const token = req.header('x-auth-token');

  //check token
  if (!token) {
    return res.status(401).json({ msg: 'No Token ,Autherization Denied' });
  }
  //verify token

  try {
    const decoded = jwt.verify(token, config.get('JwtSecret'));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'No Token ,Autherization Denied' });
  }
};
