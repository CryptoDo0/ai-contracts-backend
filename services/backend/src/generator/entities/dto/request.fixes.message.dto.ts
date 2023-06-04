import {IsBoolean, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RequestFixesMessage {
    @ApiProperty({example: 'Error in line 80', description: 'Error when build or compile code'})
    @IsString({message: 'Mast be string'})
    errorMessage: string;

    @ApiProperty({example: 1, description: 'Generation answer id'})
    @IsNumber()
    generatedResponseId: number;

    @ApiProperty({example: true, description: 'Advance request'})
    @IsBoolean({message: 'Mast be boolean'})
    advance: boolean;
}

