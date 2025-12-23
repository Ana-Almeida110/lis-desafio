import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";

export function allowRoles(roles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.headers["role"];

    if (!userRole || !roles.includes(userRole as UserRole)) {
        return res.status(403).json({ message: "Acesso negado" });
    }

    next();
  };
}

  