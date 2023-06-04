import {IsBoolean, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RequestMessage {
    @ApiProperty({example: 'rieUk8k9Rsg4U2wh4FugNJgmxm1XQ8B3', description: 'Unique session id for chat context'})
    @IsString({message: 'Mast be string'})
    sessionId: string;

    @ApiProperty({example: 'Write me the basic ERC20 contract', description: 'Message to chat'})
    @IsString({message: 'Mast be string'})
    promt: string;
    
    @ApiProperty({example: true, description: 'Advance request'})
    @IsBoolean({message: 'Mast be boolean'})
    advance: boolean;
    
    constructor(sessionId: string, promt: string, advance: boolean) {
        this.sessionId = sessionId;
        this.promt = promt;
        this.advance = advance;
    }
}
