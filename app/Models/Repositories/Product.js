class Product {
  static async getProducts({ page, perPage, order, sort, filters }) {
    return this.query()
      .with('attributes')
      .where(function() {
        if (filters) {
          for (const field in filters) {
            if (filters.hasOwnProperty(field)) {
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
      .where('id', id)
      .firstOrFail();
  }
}

module.exports = Product;
