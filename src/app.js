import express from 'express';
import routes from './routes.js';
import cors from 'cors';
 
const app = express();
 
// ✅ CORS: aceita localhost (dev) e Vercel (produção)
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://https://dev-burguer-mauve.vercel.app/", // 👈 troque pelo seu domínio real na Vercel
];
 
app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requests sem origin (ex: Postman, curl, server-to-server)
      if (!origin) return callback(null, true);
 
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
 
      return callback(new Error(`CORS bloqueado para origem: ${origin}`));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use(routes);
 
export default app;