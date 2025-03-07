import { Request, Response } from 'express';
import knex from '../config/database';

// 1. Lista de nomes e IDs das raças
export const getAllRaces = async (req: Request, res: Response) => {
  try {
    const races = await knex('races').select('*'); // Retorna todas as colunas
    res.json(races);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar raças.', error });
  }
};

// 2. Detalhes completos de uma raça específica
export const getRaceById = async (req: Request, res: Response) => {
  const { id } = req.params; // Captura o ID da raça solicitado na URL

  try {

    const race = await knex.raw(`
      SELECT 
          r.id AS race_id,
          r.nome AS race_name,
          r.description,
          r.ability_increase,
          r.age,
          r.alignment,
          r.size,
          r.speed,
          r.tipo_de_criatura,
          r.languages,
          r.vision,
          r.blocker,
          COALESCE(
              json_agg(
                  jsonb_build_object(
                      'id', ar.id,
                      'name', ar.nome,
                      'type', ar.type_ability_id,
                      'effect', ar.efect,
                      'description', ar.description
                  )
              ) FILTER (WHERE ar.id IS NOT NULL),
              '[]'
          ) AS abilities
      FROM races r
      LEFT JOIN races_ability_races rar ON r.id = rar.id_races
      LEFT JOIN ability_races ar ON rar.id_ability = ar.id
      WHERE r.id = ?
      GROUP BY r.id;
    `, [id]); // Passa o ID como parâmetro para evitar SQL Injection

    if (race.rows.length === 0) {
      return res.status(404).json({ message: 'Raça não encontrada.' });
    }

    res.json(race.rows[0]); // Retorna apenas a raça solicitada
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar a raça.', error });
  }
};

// 3. Apenas as habilidades (skills) de uma raça específica
export const getAbilityByRace = async (req: Request, res: Response) => {
  const { id } = req.params; // Captura o ID da raça na URL
  try {

    const abilities = await knex.raw(`
      SELECT 
          ar.id AS ability_id,
          ar.nome AS ability_name,
          ar.type_ability_id,
          ar.efect,
          ar.description AS ability_description
      FROM races_ability_races rar
      JOIN ability_races ar ON rar.id_ability = ar.id
      WHERE rar.id_races = ?;
    `, [id]); // Passa o ID como parâmetro

    if (abilities.rows.length === 0) {
      return res.status(404).json({ message: 'Nenhuma habilidade encontrada para esta raça.' });
    }

    res.json(abilities.rows); // Retorna a lista de habilidades
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar habilidades da raça.', error });
  }
};

