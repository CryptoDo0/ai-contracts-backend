import { Injectable, Inject, HttpException, HttpStatus } from "@nestjs/common";
import { User } from "./user.model";
import { USERS_REPOSITORY } from "../constants";
import { CreateUserDto } from "./dto/create-user.dto";
import { RolesService } from "../roles/roles.service";
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {

    constructor(
            @Inject(USERS_REPOSITORY)
            private userRepository: typeof User,
            private roleService: RolesService
    ) {}

    async createUser(dto: CreateUserDto) {
        const dbUser = await this.getUserByEmail(dto.email);
        if (dbUser) {
            console.log("DbUser:", dbUser)
            throw new HttpException('User email already exist', HttpStatus.CONFLICT);
        }

        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue("USER");
        await user.$set('roles', [role.id]);
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: {all: true}});
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.roleService.getRoleByValue(dto.value);
        if (role && user) {
            await user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('Role or user not found', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND)
        }

        user.banned = true;
        user.banReason = dto.reason;

        await user.save();
        return user;
    }
}
