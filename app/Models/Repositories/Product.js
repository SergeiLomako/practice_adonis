const Env = use('Env');

class Product {
  static async getProducts({
    page = 1,
    perPage = Env.get('PAGINATE_LIMIT', 10),
    order = 'id',
    sort = 'ASC',
    filters = null
  }) {
    const filterFields = ['type_id', 'user_id', 'title'];
    return this.query()
      .with('attributes')
      .with('user')
      .with('type')
      .where(function() {
        if (filters && typeof filters === 'object') {
          for (const field of Object.keys(filters)) {
            if (filterFields.includes(field)) {
              this.where(field, filters[field]);
            }
          }
        }
      })
      .orderBy(order, sort)
      .paginate(page, perPage);
  }

  static async getSingleProduct(id) {
    return this.query()
      .with('attributes')
      .with('user')
      .with('type')
      .where('id', id)
      .firstOrFail();
  }

  static async update({ product, data, attributes }) {
    product.merge(data);
    await product.save();
    await Promise.all(
      Object.keys(attributes).map(attrId =>
        product
          .attributes()
          .pivotQuery()
          .where('attribute_id', attrId)
          .update({ value: attributes[attrId] })
      )
    );
    return product;
  }

  static async createWithAttributes({ data, attributes }) {
    const newProduct = await this.create(data);
    await newProduct.attributes().attach(Object.keys(attributes), row => {
      row.value = attributes[row.attribute_id];
    });
    return newProduct;
  }
}

module.exports = Product;
