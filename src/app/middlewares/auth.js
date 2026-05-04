import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth.js';

const authMiddleware = (req, res, next) => {

  
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token not provided!' });
  }

  const token = authToken.split(' ')[1];

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    req.userId = decoded.id;
    req.userName = decoded.name;
    req.userIsAdmin = decoded.admin;

    return next();

  } catch (err) {
    return res.status(401).json({ error: 'Token invalid!' });
  }
};

export default authMiddleware;