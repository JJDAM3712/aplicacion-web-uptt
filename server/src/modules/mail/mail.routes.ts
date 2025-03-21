import { Router } from 'express';
import { EnviarMail } from './mail';

const router = Router();

router.post('/mail', EnviarMail);

export default router;
