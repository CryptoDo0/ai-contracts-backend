import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {

    @ApiProperty({example: '11', description: 'User id'})
    @IsNumber({}, {message: 'Mast be string'})
    readonly userId: number;

    @ApiProperty({example: 'USER', description: 'Role TYPE'})
    @IsString({message: 'Mast be string'})
    readonly value: string;
}