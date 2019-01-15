const BaseValidator = use('App/Validators/BaseValidator');

class TypeStore extends BaseValidator {
  get rules() {
    return {
      title: 'required|max:255'
    };
  }
}

module.exports = TypeStore;
