import { IsNumber } from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RequestConstructorDetail {
    
    @ApiProperty({example: 1, description: 'Generated response id'})
    @IsNumber()
    generatedResponseId: number;
    
}
