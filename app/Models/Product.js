const Base = require('./Base');

class Product extends Base {
  static get updatedAtColumn() {
    return null;
  }

  attributes() {
    return this.belongsToMany('App/Models/Attribute')
      .pivotModel('App/Models/Value')
      .withPivot(['value']);
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  type() {
    return this.belongsTo('App/Models/Type');
  }
}

module.exports = Product;
