import {Body, Controller, Post, Get} from '@nestjs/common';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Promt} from "./entities/promt.model";
import {RequestNewPromt} from "./entities/dto/request.new.promt.dto";
import {PromtService} from "./promt.service";
import {ResponseMessage} from "../generator/entities/dto/response.message.dto";

@ApiTags("Promt")
@Controller('api/v1/promt')
export class PromtController {
    
    constructor(private readonly promtService: PromtService) {}

    @ApiOperation({summary: 'Request new promt'})
    @ApiBody({ description: 'Create or Update base promt. (Include "${promt}" for replace this place future promt requests.)', type: RequestNewPromt })
    @ApiResponse({status: 200, type: ResponseMessage})
    @Post("/new")
    async setBasePromt(@Body() requestNewPromt: RequestNewPromt): Promise<Promt> {
        return this.promtService.saveNewPromt(requestNewPromt);
    }
    
    @ApiOperation({summary: 'Get actual promt'})
    @ApiResponse({status: 200, type: Promt})
    @Get("/actual")
    async getActualPromt(): Promise<Promt> {
        return this.promtService.getActualPromt();
    }
}
