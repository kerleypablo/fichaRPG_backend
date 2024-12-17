import { Router } from 'express';
import { getAllCharacters } from '../controllers/characterController';

const router = Router();

router.get('/', getAllCharacters);

export default router;
