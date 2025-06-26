const jwt = require('jsonwebtoken');

const verifyUser = (req, res, next) => {
      const cookie=req.cookies;
      if(!cookie?.token) return res.sendStatus(401);
      const token = cookie.token;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'recruiter') return res.sendStatus(403);
    req.user = decoded;
    next();
  } catch (err) {
    return res.sendStatus(403);
  }
};

module.exports = verifyUser;
