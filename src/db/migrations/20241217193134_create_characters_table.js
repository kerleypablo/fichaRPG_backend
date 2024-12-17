/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('characters', (table) => {
      table.increments('id').primary(); // ID auto-incrementável
      table.string('name').notNullable(); // Nome do personagem
      table.jsonb('attributes'); // Atributos em JSON
      table.timestamps(true, true); // Colunas created_at e updated_at
    });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('characters');
  };
  