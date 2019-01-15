const BaseValidator = use('App/Validators/BaseValidator');

class AttributeStore extends BaseValidator {
  get rules() {
    return {
      title: 'required|max:255',
      type_id: 'required|integer|exist:types'
    };
  }
}

module.exports = AttributeStore;
