import type {User} from './DBTypes';

type Credentials = Pick<User, 'username' | 'password'>;

type RegisterCredentials = Pick<User, 'username' | 'password' | 'email'>;

export type {Credentials, RegisterCredentials};
