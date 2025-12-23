import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/User";
import jwt from "jsonwebtoken";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "segredo";

router.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: "Email e senha obrigatórios" });
  }

  const userRepository = AppDataSource.getRepository(User);  
  const user = await userRepository.findOne({
    where: { email },
  });

  if (!user || user.pass !== pass) {
    return res.status(401).json({ message: "Credenciais inválidas" });
  } 

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ token });  
});

export default router;