import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
}
