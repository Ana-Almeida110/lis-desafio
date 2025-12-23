import { Router } from "express";
import { AppDataSource } from "../index";
import { User } from "../entities/User";

const router = Router();

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

  const { pass: _, ...userData } = user;
  return res.json(userData);
});

export default router;