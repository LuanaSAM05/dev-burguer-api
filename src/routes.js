import { Router } from "express";
import UserController from "../src/app/controllers/UserController.js";
import SessionController from "./app/controllers/SessionController.js";
import ProductController from "./app/controllers/ProductController.js";
import multer from "multer";
import multerConfig from "./config/multer.cjs";
import authMiddleware from "./app/middlewares/auth.js";
import CategoryController from "./app/controllers/CategoryController.js";
import adminMiddleware from "./app/middlewares/admin.js";
import OrderController from "./app/controllers/OrderController.js";
import CreatePaymentIntentController from "./app/controllers/stripe/CreatePaymentIntentController.js";

const routes = new Router();
const uploads = multer(multerConfig);

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

routes.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

routes.use(authMiddleware);

routes.post("/products", adminMiddleware, uploads.single("file"), ProductController.store);
routes.put("/products/:id", adminMiddleware, uploads.single("file"), ProductController.update);
routes.get("/products", ProductController.index);

routes.post("/categories", adminMiddleware, uploads.single("file"), CategoryController.store);
routes.put("/categories/:id", adminMiddleware, uploads.single("file"), CategoryController.update);
routes.get("/categories", CategoryController.index);

routes.post("/orders", OrderController.store);
routes.get("/orders", OrderController.index);
routes.put("/orders/:id", adminMiddleware, OrderController.update);

routes.post("/create-payment-intent", CreatePaymentIntentController.store);

export default routes;