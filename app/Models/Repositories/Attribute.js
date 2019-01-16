const Env = use('Env');

class Attribute {
  static async getAttributes({
    page = 1,
    perPage = Env.get('PAGINATE_LIMIT', 10),
    search = false,
    order = 'id',
    sort = 'ASC'
  }) {
    return this.query()
      .where(function() {
        if (search) {
          this.whereRaw('LOWER(title) LIKE ?', `%${search.toLowerCase()}%`);
        }
      })
      .orderBy(order, sort)
      .paginate(page, perPage);
  }

  static async getSingleAttribute(id) {
    return this.query()
      .where('id', id)
      .firstOrFail();
  }

  static async updateAttribute({ id, data }) {
    const attribute = await this.findOrFail(id);
    attribute.merge(data);
    await attribute.save();
    return attribute;
  }
}

module.exports = Attribute;
