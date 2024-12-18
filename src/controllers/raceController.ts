import { Request, Response } from 'express';
import knex from '../config/database';

// 1. Lista de nomes e IDs das raças
export const getAllRaces = async (req: Request, res: Response) => {
  try {
    const races = await knex('races').select('id', 'name');
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar raças.', error });
  }
};

// 2. Detalhes completos de uma raça específica
export const getRaceById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const race = await knex('races').where({ id }).first();

    if (!race) {
      return res.status(404).json({ message: 'Raça não encontrada.' });
    }

    const skills = await knex('race_skills')
      .join('race_skills_mapping', 'race_skills.id', '=', 'race_skills_mapping.skill_id')
      .where('race_skills_mapping.race_id', id)
      .select('race_skills.id', 'race_skills.name', 'race_skills.description');

    res.json({ ...race, skills });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar informações da raça.', error });
  }
};

// 3. Apenas as habilidades (skills) de uma raça específica
export const getRaceSkillsById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const skills = await knex('race_skills')
      .join('race_skills_mapping', 'race_skills.id', '=', 'race_skills_mapping.skill_id')
      .where('race_skills_mapping.race_id', id)
      .select('race_skills.id', 'race_skills.name', 'race_skills.description');

    if (skills.length === 0) {
      return res.status(404).json({ message: 'Nenhuma habilidade encontrada para esta raça.' });
    }

    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar habilidades da raça.', error });
  }
};
