import { Router } from 'express';
import { getAllRaces, getRaceById, getRaceSkillsById } from '../controllers/raceController';
import asyncHandler from '../utils/asyncHandler';


const router = Router();

// Endpoint 1: Retorna a lista de nomes e IDs das raças
router.get('/races', getAllRaces);

// Endpoint 2: Retorna todos os detalhes de uma raça específica
router.get('/races/:id', asyncHandler(getRaceById));

// Endpoint 3: Retorna as habilidades de uma raça específica
router.get('/races/:id/skills',  asyncHandler(getRaceSkillsById));

export default router;
