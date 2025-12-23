import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../entities/User";

const JWT_SECRET = process.env.JWT_SECRET || "segredo";

interface JwtPayload {
  id: number;
  role: UserRole;
}

export const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as unknown as JwtPayload;
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token inválido" });
  }    
};

export const allowRoles = (roles: UserRole[]) => {
  return (req: any, res: Response, next: NextFunction) => {
    const user = req.user as JwtPayload;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json({ message: "Acesso negado" });
    }
    next();
  };
};






  