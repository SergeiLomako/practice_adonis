/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddCreatedAtInProductsSchema extends Schema {
  up() {
    this.table('products', table => {
      table.timestamp('created_at').defaultTo(this.fn.now());
    });
  }

  down() {
    this.table('products', table => {
      table.dropColumn('created_at');
    });
  }
}

module.exports = AddCreatedAtInProductsSchema;
