const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should encrypt user password', async () => {
    const user = await User.create({
      name: 'Lucas',
      email: 'lucas.araraki@oceantek.com.br',
      password: '1234qwer'
    });

    const compareHash = await bcrypt.compare(user.password, user.password_hash)

    expect(compareHash).toBe(true);
  });
})