import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, "8d44d8b4b7c1a4bf3c8d9c9e6a7f0e3d");
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' });
  }
};