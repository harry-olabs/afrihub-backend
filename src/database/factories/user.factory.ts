import { define } from 'typeorm-seeding';
import { faker } from '@faker-js/faker';
import { User } from '../../api/users/entities/user.entity';

define(User, () => {
  const user = new User();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  user.firstName = firstName;
  user.lastName = lastName;
  user.email = faker.internet.email({ firstName, lastName });
  user.password = 'secret123';

  return user;
});
