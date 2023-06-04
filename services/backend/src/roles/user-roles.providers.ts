import { USER_ROLES_REPOSITORY } from 'src/constants';
import { UserRoles } from "./user-roles.model";

export const userRolesProviders = [
    {
        provide: USER_ROLES_REPOSITORY,
        useValue: UserRoles,
    },
];