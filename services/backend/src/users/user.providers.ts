import { USERS_REPOSITORY } from 'src/constants';
import { User } from './user.model';

export const userProviders = [
    {
        provide: USERS_REPOSITORY,
        useValue: User,
    },
];