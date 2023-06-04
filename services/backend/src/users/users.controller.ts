import { Body, Controller, Get, Post, UseGuards, UsePipes } from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from "./users.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from './user.model';
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";

@ApiTags("Users")
@Controller('api/v1/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Create new user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Give roles'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/role')
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200})
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
