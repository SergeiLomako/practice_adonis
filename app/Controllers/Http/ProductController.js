const Product = use('App/Models/Product');

class ProductController {
  constructor() {
    this.fields = ['title', 'price', 'user_id', 'type_id'];
  }

  async index({ request }) {
    return Product.getProducts(request.only(['page', 'perPage', 'order', 'sort', 'filters']));
  }

  async show({ params }) {
    return Product.getSingleProduct(params.id);
  }

  async store({ request, response }) {
    const newProduct = await Product.createWithAttributes({
      data: request.only(this.fields),
      attributes: request.input('attributes')
    });
    return response.status(201).json(newProduct);
  }

  async update({ request, params }) {
    return Product.update({
      data: request.only(this.fields),
      attributes: request.input('attributes'),
      id: params.id
    });
  }

  async destroy({ response, params }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();
    return response.status(204).send();
  }
}

module.exports = ProductController;
