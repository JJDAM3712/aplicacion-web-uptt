import { Router } from "express";
import MensionController from "../controllers/mension.controller";

const router = Router();

router.get('/mension', MensionController.getMension);
router.get('/mension/:id', MensionController.getMensionById);
router.post('/mension', MensionController.postMension);
router.put('/mension/:id', MensionController.putMension);
router.delete('/mension/:id', MensionController.deleteMension);

export default router;