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
    const { type_id, user_id, title, price, attributes } = request.all();
    const newProduct = await Product.create({
      type_id,
      user_id,
      title,
      price
    });
    await newProduct.attributes().attach(Object.keys(attributes), row => {
      row.value = attributes[row.attribute_id];
    });

    return response.status(201).json(newProduct);
  }

  async update({ request, response, params }) {
    const product = await Product.findOrFail(params.id);
    const data = request.only(['title', 'price', 'user_id', 'type_id']);
    product.merge(data);
    await product.save();
    const { attributes } = request.all();
    const updatingAttributes = [];
    for (const id in attributes) {
      if (attributes.hasOwnProperty(id)) {
        updatingAttributes.push(
          product
            .attributes()
            .pivotQuery()
            .where('attribute_id', id)
            .update({ value: attributes[id] })
        );
      }
    }
    await Promise.all(updatingAttributes);
    return response.json(product);
  }

  async destroy({ response, params }) {
    const product = await Product.findOrFail(params.id);
    await product.delete();
    return response.status(204).send();
  }
}

module.exports = ProductController;
