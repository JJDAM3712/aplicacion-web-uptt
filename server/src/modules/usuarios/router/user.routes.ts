import { Router } from "express";
import userController from "../controller/user.controller";

const router = Router();

// rutas de usuarios
router.get("/usuarios", userController.getController);
router.get("/usuarios/:id", userController.getControllerById);
router.post("/usuarios", userController.postController);
router.put("/usuarios/:id", userController.putController);

export default router;