const Route = use('Route');

Route.group(() => {
  Route.get('/', () => ({ status: 'Ok', version: '1.0.0' }));

  Route.post('/login', 'AuthController.login').validator('Login');

  Route.resource('types', 'TypeController')
    .apiOnly()
    .validator(new Map([[['types.store'], ['/TypeStore']], [['types.update'], ['/TypeStore']]]))
    .middleware(['auth', 'is:admin']);

  Route.resource('products', 'ProductController')
    .apiOnly()
    .validator(new Map([[['products.store'], ['/ProductStore']], [['products.update'], ['/ProductStore']]]))
    .middleware(new Map([[['store'], ['auth', 'is:user']], [['update', 'destroy'], ['auth', 'is:user', 'isOwner']]]));

  Route.resource('attributes', 'AttributeController')
    .apiOnly()
    .validator(new Map([[['attributes.store'], ['/AttributeStore']], [['attributes.update'], ['/AttributeStore']]]))
    .middleware(['auth', 'is:admin']);
}).prefix('api/v1');
