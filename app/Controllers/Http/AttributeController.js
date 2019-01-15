const Attribute = use('App/Models/Attribute');

class AttributeController {
  constructor() {
    this.fields = ['title', 'type_id'];
  }

  async index({ request }) {
    return Attribute.getAttributes(request.only(['page', 'perPage', 'search', 'order', 'sort']));
  }

  async show({ params }) {
    return Attribute.getSingleAttribute(params.id);
  }

  async store({ request, response }) {
    const attribute = await Attribute.create(request.only(this.fields));
    return response.status(201).json(attribute);
  }

  async update({ request, params }) {
    return Attribute.updateAttribute({
      id: params.id,
      data: request.only(this.fields)
    });
  }

  async destroy({ response, params }) {
    const attribute = await Attribute.findOrFail(params.id);
    await attribute.delete();
    return response.status(204).send();
  }
}

module.exports = AttributeController;
