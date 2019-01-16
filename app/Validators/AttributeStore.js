const BaseValidator = use('App/Validators/BaseValidator');

class AttributeStore extends BaseValidator {
  get rules() {
    return {
      title: 'required|min:2|max:30',
      type_id: 'required|exist:types'
    };
  }
}

module.exports = AttributeStore;
