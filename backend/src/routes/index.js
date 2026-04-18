import { Router }  from 'express';
import contactRouter from './contact.js';

const router = Router();

router.use('/contact', contactRouter);

export default router;
