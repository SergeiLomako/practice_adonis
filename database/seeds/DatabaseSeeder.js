const Factory = use('Factory');
const Database = use('Database');

class DatabaseSeeder {
  async run() {
    const types = await Factory.model('App/Models/Type').createMany(10);
    await Promise.all(
      types.map(type => Factory.model('App/Models/Attribute').createMany(3, { typeId: type.id }))
    );
    const attributes = await Database.table('attributes');
    const users = await Factory.model('App/Models/User').createMany(10);
    const products = await Promise.all(
        users.map(user =>
          Promise.all(types.map(type =>
            Factory.model('App/Models/Product').create({
              typeId: type.id,
              userId: user.id
            })
          )
        ))
    );
    await Promise.all(
        products.map(product =>
          Promise.all(attributes.filter(attr => attr.type_id === product.type_id).map(productAttr =>
            Factory.model('App/Models/Value').create({
              productId: product.id,
              attributeId: productAttr.id
            })
          ))
        )
    );
  }
}

module.exports = DatabaseSeeder;
