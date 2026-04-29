import express from 'express';
import routes from './routes.js';
import { fileRouterConfig } from './config/fileRoutes.cjs';
import cors from 'cors';

console.log("🔥 ROUTES CARREGOU");

const app = express();

// 🔥 CORS correto
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products-file", fileRouterConfig);
app.use("/category-file", fileRouterConfig);

// rotas principais
app.use(routes);

export default app;