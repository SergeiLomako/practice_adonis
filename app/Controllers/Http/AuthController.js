class AuthController {
  async login({ request, auth }) {
    const { email, password } = request.all();
    return auth.attempt(email, password);
  }
}

module.exports = AuthController;
