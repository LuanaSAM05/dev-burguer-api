import express from 'express';
import routes from './routes.js';
import { fileRouterConfig } from './config/fileRoutes.cjs';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products-file", fileRouterConfig);
app.use("/category-file", fileRouterConfig);


app.use(routes);

export default app;