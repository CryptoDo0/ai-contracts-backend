import { Body, Controller, Get, Injectable, Param, Post } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Role')
@Controller('api/v1/roles')
export class RolesController {

    constructor(private roleSrvice: RolesService) {}

    @ApiOperation({summary: 'Create new role'})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleSrvice.createRole(dto);
    }

    @ApiOperation({summary: 'Get all exist roles'})
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.roleSrvice.getRoleByValue(value);
    }

}

