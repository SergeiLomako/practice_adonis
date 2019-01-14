const Product = use('App/Models/Product');
const Env = use('Env');

class ProductController {
  async index({ request }) {
    const { page = 1, perPage = Env.get('PAGINATE_LIMIT', 10), order = 'id', sort = 'ASC', filters } = request.all();
    return Product.getProducts({ page, perPage, order, sort, filters });
  }

  async show({ params }) {
    return Product.getSingleProduct(params.id);
  }

  async store({ request, response }) {
    const data = request.only(['type_id', 'user_id', 'title', 'price']);
    const newProduct = await Product.create(data);
    const { attributes } = request.all();
    await newProduct.attributes().attach(Object.keys(attributes), row => {
      row.value = attributes[row.attribute_id];
    });
    return response.status(201).json(newProduct);
  }

  async update({ request, params }) {
    const { id } = params;
    const data = request.only(['title', 'price', 'user_id', 'type_id']);
    const { attributes } = request.all();
    return Product.update({ id, data, attributes });
  }

  async destroy({ response, params }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();
    return response.status(204).send();
  }
}

module.exports = ProductController;
