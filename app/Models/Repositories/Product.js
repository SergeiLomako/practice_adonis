class Product {
  static async getProducts({ page, perPage, order, sort, filters }) {
    return this.query()
      .with('attributes')
      .where(function() {
        if (filters && typeof filters === 'object') {
          for (const field in filters) {
            if (filters.hasOwnProperty(field)) {
              switch (field) {
                case 'type_id':
                  this.whereHas('type', builder => {
                    builder.where('id', filters[field]);
                  });
                  break;
                case 'title':
                  this.where('title', filters[field]);
                  break;
                case 'user_id':
                  this.whereHas('user', builder => {
                    builder.where('id', filters[field]);
                  });
                  break;
                default:
                // unknown filter
              }
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
