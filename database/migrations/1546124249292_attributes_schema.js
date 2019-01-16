const Schema = use('Schema');

class AttributesSchema extends Schema {
  up() {
    this.create('attributes', table => {
      table.increments();
      table.string('title').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('attributes');
  }
}

module.exports = AttributesSchema;
