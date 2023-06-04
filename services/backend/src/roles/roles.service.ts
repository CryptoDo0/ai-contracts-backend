import { Inject, Injectable } from "@nestjs/common";
import { CreateRoleDto } from './dto/create-role.dto';
import { ROLES_REPOSITORY } from "../constants";
import { Role } from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@Inject(ROLES_REPOSITORY) private roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const roles = await this.roleRepository.findOne({where: {value}});
        return roles;
    }
}
