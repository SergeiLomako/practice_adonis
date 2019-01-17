const Product = use('App/Models/Product');

class IsOwner {
  /*eslint-disable */
  async handle({ request, response, params, auth }, next) {
    const product = await Product.findOrFail(params.id);
    if (auth.user.id !== product.user_id) {
      return response.status(403).json({ message: 'Access denied' });
    }
    request.product = product;
    await next();
  }
  /* eslint-enable */
}

module.exports = IsOwner;
