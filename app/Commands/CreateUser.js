const { Command } = require('@adonisjs/ace');

const Registration = use('App/Validators/Registration');
const { validate } = use('Validator');
const User = use('App/Models/User');
const Database = use('Database');
const Event = use('Event');

class CreateUser extends Command {
  static get signature() {
    return 'create:user';
  }

  static get description() {
    return 'Creating new user (admin or standard)';
  }

  async handle() {
    const databaseRoles = await Database.table('roles').select(['name', 'id']);
    const roles = databaseRoles.reduce((acc, role) => {
      return { ...acc, [role.name]: role.id };
    }, {});
    const role = await this.choice('Role', Object.keys(roles), Object.keys(roles)[0]);
    const answers = {
      email: await this.ask('Email'),
      username: await this.ask('Username (max:20)'),
      password: await this.secure('Password (min:6 | max:25)'),
    };

    const { rules, messages } = new Registration();
    const validation = await validate(answers, rules, messages);
    if (validation.fails()) {
      this.error(`${this.icon('error')}  ${validation.messages()[0].message}`);
      process.exit(1);
    } else {
      const user = await User.create(answers);
      await user.roles().attach([roles[role].id]);
      user.rawPassword = answers.password;
      Event.fire('createUser', user);
      Database.close();
      this.success(`${this.icon('success')}  ${role} created`);
    }
  }
}

module.exports = CreateUser;
