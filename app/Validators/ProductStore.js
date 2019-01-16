const BaseValidator = use('App/Validators/BaseValidator');
const Validator = use('Validator');
const Type = use('App/Models/Type');

const attrsFn = async (data, field, message) => {
  const { type_id, attributes } = data; // eslint-disable-line
  if (!attributes) {
    // skip validation if value is not defined or not index. `required` or `integer` rules should take care of it.
    return;
  }
  const type = await Type.findOrFail(type_id);
  const { rows: typeAttrs } = await type.attributes().fetch();

  let fails = typeAttrs.length !== Object.keys(attributes).length;
  typeAttrs.forEach(typeAttr => {
    fails = fails || typeof attributes[typeAttr.id] === 'undefined';
  });

  if (fails) {
    throw message;
  }
};

Validator.extend('attrs', attrsFn);

class ProductStore extends BaseValidator {
  get rules() {
    return {
      type_id: 'required|integer|exist:types',
      user_id: 'required|integer|exist:users',
      title: 'required|max:50',
      price: 'required|number|above:0',
      attributes: 'required|attrs'
    };
  }
}

module.exports = ProductStore;
