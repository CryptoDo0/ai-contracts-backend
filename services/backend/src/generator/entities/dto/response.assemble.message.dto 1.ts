import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class ResponseAssembleCode {
    
    @ApiProperty({example: 'rieUk8k9Rsg4U2wh4FugNJgmxm1XQ8B3', description: 'Unique session id for chat context'})
    @IsString({message: 'Mast be string'})
    sessionId: string;
    
    @ApiProperty({example: '[solidity code] from gpt4', description: 'Message from chat'})
    @IsString({message: 'Mast be string'})
    code: string;
    
    @ApiProperty({example: '[solidity code with flatten imports]', description: 'Assemble code based on code from chat'})
    @IsString({message: 'Mast be string'})
    assembleCode: string;
    
    
    @ApiProperty({example: 1, description: 'Id of response with code'})
    @IsNumber()
    generatedRespinseId: number;
    
    constructor(sessionId: string, code: string, assembleCode: string, generatedRespinseId: number) {
        this.sessionId = sessionId;
        this.code = code;
        this.assembleCode = assembleCode;
        this.generatedRespinseId = generatedRespinseId;
    }
}
