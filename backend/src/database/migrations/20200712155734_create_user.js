
exports.up = function(knex) {
  return knex.schema.createTable('user', function(table){
      table.increments();
      table.string('email').notNullable();
      table.string('telefone').notNullable();
      table.string('senha').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('user');
};
