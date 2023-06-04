import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

    @ApiProperty({example: 'user@user.com', description: 'Email address'})
    @IsString({message: 'Mast be string'})
    @IsEmail({}, {message: "Email not correct"})
    readonly email: string;

    @ApiProperty({example: '12345678', description: 'User password'})
    @IsString({message: 'Mast be string'})
    @Length(4, 16, {message: 'Password length must be beetween 4 and 16'})
    readonly password: string;
}