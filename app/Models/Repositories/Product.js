class Product {
  static async getProducts({ page, perPage, order, sort, filters }) {
    return this.query()
      .with('attributes')
      .with('user')
      .with('type')
      .where(function() {
        if (filters && typeof filters === 'object') {
          for (const filter of Object.values(filters)) {
            switch (filter) {
              case 'type_id':
                this.where('type_id', filter);
                break;
              case 'title':
                this.where('title', filter);
                break;
              case 'user_id':
                this.where('user_id', filter);
                break;
              default:
              // do nothing
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

  static async update({ id, data, attributes }) {
    const product = await this.findOrFail(id);
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
}

module.exports = Product;
