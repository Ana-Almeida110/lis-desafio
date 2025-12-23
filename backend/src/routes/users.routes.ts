import { Router } from "express";
import { AppDataSource } from "../index";
import { User, UserRole } from "../entities/User";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/users", async (req, res) => {
    const userRepository = AppDataSource.getRepository(User);

    const { name, email, pass, role } = req.body;

    if (!name || !email || !pass || !role) {
        return res.status(400).json({ message: "Campos obrigatórios" });
    }

    const exists = await userRepository.findOne({ where: { email } });
    if (exists) {
        return res.status(400).json({ message: "Usuário já existe" });
    }

    const hashedPassword = await bcrypt.hash(pass, 10);

    const user = userRepository.create({
        name,
        email,
        pass: hashedPassword,
        role,
    });

    await userRepository.save(user);
    return res.status(201).json(user);
});

export default router;


