import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class ResponseMessage {
    
    @ApiProperty({example: 'rieUk8k9Rsg4U2wh4FugNJgmxm1XQ8B3', description: 'Unique session id for chat context'})
    @IsString({message: 'Mast be string'})
    sessionId: string;
    
    @ApiProperty({example: '[solidity code] or Message from gpt4', description: 'Message from chat'})
    @IsString({message: 'Mast be string'})
    message: string;
    
    
    @ApiProperty({example: 1, description: 'Id of response with code'})
    @IsNumber()
    generatedRespinseId: number;
    
    constructor(sessionId: string, message: string, generatedRespinseId: number) {
        this.sessionId = sessionId;
        this.message = message;
        this.generatedRespinseId = generatedRespinseId;
    }
}
