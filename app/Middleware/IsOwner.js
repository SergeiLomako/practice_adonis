const Product = use('App/Models/Product');
const NoAccessException = use('App/Exceptions/NoAccessException');

class IsOwner {
  /*eslint-disable */
  async handle({ request, response, params, auth }, next) {
    const product = await Product.findOrFail(params.id);
    if (auth.user.id !== product.user_id) throw new NoAccessException();
    request.product = product;
    await next();
  }
  /* eslint-enable */
}

module.exports = IsOwner;
