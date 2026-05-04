import express from 'express';
import routes from './routes.js';
import cors from 'cors';
 
const app = express();
 
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://dev-burguer-mauve.vercel.app", 
  "https://dev-burguer-2026.vercel.app",  
];
 
app.use(
  cors({
    origin: (origin, callback) => {
     
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