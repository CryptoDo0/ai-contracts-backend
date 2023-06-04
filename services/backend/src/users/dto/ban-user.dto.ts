import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class BanUserDto {

    @ApiProperty({example: '11', description: 'User id'})
    @IsNumber({}, {message: 'Mast be number'})
    readonly userId: number;

    @ApiProperty({example: 'Spam attack', description: 'Reason for ban'})
    @IsString({message: 'Mast be string'})
    readonly reason: string;
}