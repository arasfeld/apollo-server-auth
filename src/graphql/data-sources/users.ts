import { DataSource, DataSourceConfig } from 'apollo-datasource';
import { KeyValueCache, InMemoryLRUCache } from 'apollo-server-caching';
import DataLoader from 'dataloader';
import { Pool } from 'pg';
import { User } from '../types';

export class UsersDataSource<TContext> extends DataSource {
  private pool: Pool;
  private cache!: KeyValueCache<string>;
  private usersById: DataLoader<string, User>;
  private usersByUsername: DataLoader<string, User>;
  readonly usersByIdCachePrefix = 'user-by-id-';
  readonly usersByUsernameCachePrefix = 'user-by-username-';

  constructor(pool: Pool) {
    super();
    this.pool = pool;
    this.usersById = new DataLoader<string, User>(ids =>
      this.pool
        .query<User>('select * from app_public.users where id = any($1)', [ids])
        .then(result => result.rows)
    );
    this.usersByUsername = new DataLoader<string, User>(usernames =>
      this.pool
        .query<User>('select * from app_public.users where username = any($1)', [usernames])
        .then(result => result.rows)
    );
  }

  initialize(config: DataSourceConfig<TContext>): void {
    this.cache = config.cache || new InMemoryLRUCache();
  }

  async getById(id: string): Promise<User> {
    const key = this.usersByIdCachePrefix + id;

    const cachedUser = await this.cache.get(key);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.usersById.load(id);
    
    this.writeToCache(user);

    return user;
  }

  async getByUsername(username: string): Promise<User> {
    const key = this.usersByUsernameCachePrefix + username;

    const cachedUser = await this.cache.get(key);
    if (cachedUser) {
      return JSON.parse(cachedUser);
    }

    const user = await this.usersByUsername.load(username);

    this.writeToCache(user);

    return user;
  }

  async create(user: Partial<User>): Promise<User> {
    const result = await this.pool.query<User>(
      `insert into app_public.users(username, email, password_hash) values($1, $2, $3) returning *`,
      [user.username, user.email, user.passwordHash],
    );

    const insertedUser = result.rows[0];

    this.usersById.prime(insertedUser.id, insertedUser);
    this.usersByUsername.prime(insertedUser.username, insertedUser);

    this.writeToCache(insertedUser);

    return insertedUser;
  }

  private writeToCache(user: User): void {
    const usersByIdKey = this.usersByIdCachePrefix + user.id;
    const usersByUsernameKey = this.usersByUsernameCachePrefix + user.username;
    const stringifiedUser = JSON.stringify(user);
    this.cache.set(usersByIdKey, stringifiedUser);
    this.cache.set(usersByUsernameKey, stringifiedUser);
  }
}
