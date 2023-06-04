import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateRoleDto {

    @ApiProperty({example: 'USER', description: 'Unique type of role'})
    @IsString({message: 'Mast be string'})
    value: string;

    @ApiProperty({example: 'User role', description: 'Role description'})
    @IsString({message: 'Mast be string'})
    description: string;
}