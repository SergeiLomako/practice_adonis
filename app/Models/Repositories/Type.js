const Env = use('Env');

class Type {
  static async getTypes({
    page = 1,
    perPage = Env.get('PAGINATE_LIMIT', 10),
    search = false,
    order = 'id',
    sort = 'ASC'
  }) {
    return this.query()
      .with('attributes')
      .where(function() {
        if (search) {
          this.whereRaw('LOWER(title) LIKE ?', `%${search.toLowerCase()}%`);
        }
      })
      .orderBy(order, sort)
      .paginate(page, perPage);
  }

  static async getSingleType(id) {
    return this.query()
      .with('attributes')
      .where('id', id)
      .firstOrFail();
  }

  static async updateType({ id, data }) {
    const type = await this.findOrFail(id);
    type.merge(data);
    await type.save();
    return type;
  }
}

module.exports = Type;
