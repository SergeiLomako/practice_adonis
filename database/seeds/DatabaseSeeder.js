const Factory = use('Factory');
const Database = use('Database');
const Role = use('Role');

class DatabaseSeeder {
  async run() {
    const roleAdmin = await Role.create({
      name: 'Admin',
      slug: 'admin',
      description: 'manage administration privileges'
    });

    const roleUser = await Role.create({
      name: 'User',
      slug: 'user',
      description: 'manage user privileges'
    });

    const types = await Factory.model('App/Models/Type').createMany(10);
    await Promise.all(types.map(type => Factory.model('App/Models/Attribute').createMany(3, { typeId: type.id })));
    const attributes = await Database.table('attributes');
    const users = await Factory.model('App/Models/User').createMany(10);
    await Promise.all(users.map((user, index) => user.roles().attach([index % 2 === 0 ? roleAdmin.id : roleUser.id])));
    const products = await Promise.all(
      users.map(user =>
        Promise.all(
          types.map(type =>
            Factory.model('App/Models/Product').create({
              typeId: type.id,
              userId: user.id
            })
          )
        )
      )
    );
    await Promise.all(
      products.map(product =>
        Promise.all(
          attributes.filter(attr => attr.type_id === product.type_id).map(productAttr =>
            Factory.model('App/Models/Value').create({
              productId: product.id,
              attributeId: productAttr.id
            })
          )
        )
      )
    );
  }
}

module.exports = DatabaseSeeder;
