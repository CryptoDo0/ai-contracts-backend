import {IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RequestNewPromt {
    @ApiProperty({example: 'Title for you promt', description: 'Title for you promt. Must be unique!'})
    @IsString({message: 'Mast be string'})
    title: string;
    
    @ApiProperty({example: 'You are an AI programming assistant. ${promt}. Remember only code response.', description: 'Update or create base promt'})
    @IsString({message: 'Mast be string'})
    promt: string;
}
