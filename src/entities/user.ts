import { Entity, Property, Unique } from '@mikro-orm/core';
import { Base } from './base-entity';

@Entity()
export class User extends Base<User> {
  @Property()
  @Unique()
  username: string;

  @Property()
  email: string;

  @Property()
  passwordHash: string;
}
