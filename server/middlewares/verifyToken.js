const jwt = require('jsonwebtoken');

module.exports.verifyToken = (req, res, next) => {
  const authorization = req.get('Authorization');
  !authorization && res.status(400).json({ message: 'Not authenticated!' });

  const token = authorization.split(' ')[1];
  let payload;
  try {
    /* Returns the payload if the signature is valid.
    If not, it will throw the error. */
    payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    res.status(500).json(error);
  }
  req.user = payload;
  next();
};

module.exports.verifyTokenAndAuthorization = (req, res, next) => {
  
  console.log('geldim');
  this.verifyToken(req, res, () => {
    console.log(req.user,req.get('id'));
    if (req.user.isAdmin === true) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that!');
    }
  });
};

module.exports.verifyTokenAndAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id === req.body.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not admin!');
    }
  });
};