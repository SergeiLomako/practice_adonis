/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class DeleteTimestampsInProductsSchema extends Schema {
  up() {
    this.table('products', table => {
      table.dropTimestamps();
    });
  }

  down() {
    this.table('products', table => {
      table.timestamps();
    });
  }
}

module.exports = DeleteTimestampsInProductsSchema;
