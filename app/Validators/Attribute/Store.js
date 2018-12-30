const BaseValidator = use('App/Validators/BaseValidator');

class Store extends BaseValidator {
  get rules() {
    return {
      title: 'required|min:2|max:20'
    };
  }
}

module.exports = Store;