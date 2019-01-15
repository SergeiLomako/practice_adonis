const Factory = use('Factory');
const concatMultipleArray = use('App/Helpers/array');

class DatabaseSeeder {
  async run() {
    const types = await Factory.model('App/Models/Type').createMany(10);
    const attributeArrays = await Promise.all(
      types.map(type => Factory.model('App/Models/Attribute').createMany(3, { typeId: type.id }))
    );
    const attributes = concatMultipleArray(attributeArrays);
    const users = await Factory.model('App/Models/User').createMany(10);
    const products = await Promise.all(
      concatMultipleArray(
        users.map(user =>
          types.map(type =>
            Factory.model('App/Models/Product').create({
              typeId: type.id,
              userId: user.id
            })
          )
        )
      )
    );
    await Promise.all(concatMultipleArray(products.map(product =>
      attributes.filter(attr => attr.type_id === product.type_id).map(productAttr =>
        Factory.model('App/Models/Value').create({
          productId: product.id,
          attributeId: productAttr.id
        })
      )
    )));
  }
}

module.exports = DatabaseSeeder;
