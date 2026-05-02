import { Router } from "express";
import UserController from "./app/controllers/UserController.js"; // ✅ CORRIGIDO (era "../src/app/...")
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import CategoryController from "./app/controllers/CategoryController.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";
 
import multer from "multer";
import multerConfig from "./config/multer.cjs";
 
import authMiddleware from "./app/middlewares/auth.js";
import adminMiddleware from "./app/middlewares/admin.js";
 
const routes = new Router();
const uploads = multer(multerConfig);
 
// 🔓 ROTAS PÚBLICAS (SEM LOGIN)
routes.get("/products", ProductController.index);
routes.get("/categories", CategoryController.index);
 
routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);
 
// 🔐 A PARTIR DAQUI PRECISA LOGIN
routes.use(authMiddleware);
 
// ORDERS (usuário logado)
routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
 
// ADMIN ONLY
routes.post("/products", adminMiddleware, uploads.single("file"), ProductController.store);
routes.put("/products/:id", adminMiddleware, uploads.single("file"), ProductController.update);
 
routes.post("/categories", adminMiddleware, uploads.single("file"), CategoryController.store);
routes.put("/categories/:id", adminMiddleware, uploads.single("file"), CategoryController.update);
 
routes.post("/create-payment-intent", CreatePaymentIntentController.store);
 
export default routes;