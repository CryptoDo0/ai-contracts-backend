import { ROLES_REPOSITORY } from 'src/constants';
import { Role } from './roles.model';

export const roleProviders = [
    {
        provide: ROLES_REPOSITORY,
        useValue: Role,
    },
];