import "reflect-metadata";
import express = require("express");
import cors = require("cors");
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes"
import leadRoutes from "./routes/leads.routes"
import userRoutes from "./routes/user"


dotenv.config();
const app = express();
app.use(cors());

app.use(cors({
  origin: "http://localhost:4200", // endereço do frontend Angular
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));


app.use(express.json());

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entities/*.ts"],
});

AppDataSource.initialize().then(() => {
  console.log("Banco conectado!");
  app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
});

app.use(authRoutes);
app.use(leadRoutes);

