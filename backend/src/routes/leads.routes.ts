import { Router } from "express";
import { AppDataSource } from "../index";
import { Lead } from "../entities/Lead";

const router = Router();

router.post(
    "/leads",
    //allowRoles([UserRole.ADMIN, UserRole.COLABORADOR]),
    async (req, res) => {

        const leadRepository = AppDataSource.getRepository(Lead);

        const { name_lead, registration_number, earnings, loan_value } = req.body;

        if (!name_lead || !registration_number || !earnings || !loan_value) {
            return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
        }

        const lead = leadRepository.create({
            name_lead,
            registration_number,
            earnings,
            loan_value,
            loan_approved: false,
            deleted: false
        });

        await leadRepository.save(lead);
        return res.status(201).json(lead);
    }
);

router.get("/leads", async (_req, res) => {
    const leadRepository = AppDataSource.getRepository(Lead);
    const leads = await leadRepository.find();
    return res.json(leads);
});

router.put(
    "/leads/:id/aprovar",
    //allowRoles([UserRole.ADMIN, UserRole.APROVADOR]),
    async (req, res) => {

        const leadRepository = AppDataSource.getRepository(Lead);
        const { id } = req.params;

        const lead = await leadRepository.findOne({
            where: { id_lead: Number(id) }
        });  

        if (
            !lead) {
                return res.status(404).json({ message: "Lead não encontrado" });
            }
            
        lead.loan_approved = true;
        await leadRepository.save(lead);

        return res.json(lead);
    }
);

export default router;

