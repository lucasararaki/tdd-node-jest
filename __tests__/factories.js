const faker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
});

/* factory.define('User', User, {
  name: 'Lucas',
  email: 'lucas.araraki@oceantek.com.br',
  password: '1234qwer'
}); */

module.exports = factory;