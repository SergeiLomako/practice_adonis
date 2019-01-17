/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RemoveRoleFromUsersSchema extends Schema {
  up() {
    this.table('users', table => {
      table.dropColumn('role');
    });
  }

  down() {
    this.table('users', table => {
      table.string('role').defaultTo('user');
    });
  }
}

module.exports = RemoveRoleFromUsersSchema;
