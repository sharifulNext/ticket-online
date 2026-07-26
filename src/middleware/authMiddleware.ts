import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'ticketsphere_jwt_super_secret_key_2026';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'user' | 'admin';
    name: string;
  };
}

export function signToken(payload: { id: string; email: string; role: 'user' | 'admin'; name: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; role: 'user' | 'admin'; name: string };
  } catch (err) {
    return null;
  }
}

export function authenticateJWT(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);

    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  // Fallback check for custom token header or query parameter for development flexibility
  const queryToken = req.query.token as string;
  if (queryToken) {
    const decoded = verifyToken(queryToken);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }

  res.status(401).json({ message: 'Unauthorized: Invalid or missing JWT token' });
}

export function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized access' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin privilege required' });
  }

  next();
}
