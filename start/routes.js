const Route = use('Route');

Route.group(() => {
  Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

  Route.resource('types', 'TypeController')
    .apiOnly()
    .validator(new Map([[['types.store'], ['/TypeStore']], [['types.update'], ['/TypeStore']]]));

  Route.resource('products', 'ProductController')
    .apiOnly()
    .validator(new Map([[['products.store'], ['/ProductStore']], [['products.update'], ['/ProductStore']]]));

  Route.resource('attributes', 'AttributeController')
    .apiOnly()
    .validator(new Map([[['attributes.store'], ['/AttributeStore']], [['attributes.update'], ['/AttributeStore']]]));
}).prefix('api/v1');
