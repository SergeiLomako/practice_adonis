const Product = use('App/Models/Product');

class ProductController {
  constructor() {
    this.fields = ['title', 'price', 'type_id'];
  }

  async index({ request }) {
    return Product.getProducts(request.only(['page', 'perPage', 'order', 'sort', 'filters']));
  }

  async show({ params }) {
    return Product.getSingleProduct(params.id);
  }

  async store({ request, response, auth }) {
    const newProduct = await Product.createWithAttributes({
      data: { ...request.only(this.fields), user_id: auth.user.id },
      attributes: request.input('attributes')
    });
    return response.status(201).json(newProduct);
  }

  async update({ request, auth }) {
    return Product.update({
      data: Object.assign(request.only(this.fields), { user_id: auth.user.id }),
      attributes: request.input('attributes'),
      product: request.product
    });
  }

  async destroy({ response, request }) {
    await request.product.delete();
    return response.status(204).send();
  }
}

module.exports = ProductController;
