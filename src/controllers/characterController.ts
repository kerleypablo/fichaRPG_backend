import { Request, Response } from 'express';
import db from '../config/database';

export const getAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await db('characters').select('*');
    res.json(characters);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar personagens.' });
  }
};
