
import { Request, Response, NextFunction } from 'express';

export function validateAdminToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  const adminToken = process.env.ADMIN_TOKEN;

  if (!adminToken) {
    console.error('ADMIN_TOKEN not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  if (token !== adminToken) {
    return res.status(401).json({ error: 'Invalid authorization token' });
  }

  next();
}
