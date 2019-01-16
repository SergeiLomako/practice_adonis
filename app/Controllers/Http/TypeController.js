const Type = use('App/Models/Type');

class TypeController {
  constructor() {
    this.fields = ['title'];
  }

  async index({ request }) {
    return Type.getTypes(request.only(['page', 'perPage', 'search', 'order', 'sort']));
  }

  async show({ params }) {
    return Type.getSingleType(params.id);
  }

  async store({ request, response }) {
    const newType = await Type.create(request.only(this.fields));
    return response.status(201).json(newType);
  }

  async update({ request, params }) {
    return Type.updateType({
      id: params.id,
      data: request.only(this.fields)
    });
  }

  async destroy({ response, params }) {
    const type = await Type.findOrFail(params.id);
    await type.delete();
    return response.status(204).send();
  }
}

module.exports = TypeController;
