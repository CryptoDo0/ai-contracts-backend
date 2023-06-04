import {
    Controller,
    Post,
    Body, Get, Param,
} from '@nestjs/common';
import { GeneratorService } from './generator.service';
import { RequestMessage } from './entities/dto/request.message.dto';
import { ResponseMessage } from './entities/dto/response.message.dto';
import {ApiBody, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RequestFixesMessage} from "./entities/dto/request.fixes.message.dto";
import {GeneratedResponse} from "./entities/generated.response.model";
import {RequestDoc} from "./entities/dto/request.doc.dto";
import {RequestType} from './entities/inner/requestType';
import {RequestConstructorDetail} from "./entities/dto/request.constructor.detail.dto";
import {RequestAssembleCode} from "./entities/dto/request.assemble.dto";
import {ResponseAssembleCode} from "./entities/dto/response.assemble.message.dto 1";


@ApiTags("Generator")
@Controller('api/v1/generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

    @ApiOperation({summary: 'Get generated response'})
    @ApiResponse({status: 200, type: ResponseMessage})
    @Get("/generated/response/:id")
    async getGeneratedResponse(@Param('id') id: number): Promise<GeneratedResponse> {
    return this.generatorService.getGeneratedResponse(id);
  }

    @ApiOperation({summary: 'Request message'})
    @ApiBody({ description: 'Requst message body', type: RequestMessage })
    @ApiResponse({status: 200, type: ResponseMessage})
    @Post("/message")
    async message(@Body() requestMessage: RequestMessage): Promise<ResponseMessage> {
        return this.generatorService.message(requestMessage, requestMessage.advance ? RequestType.ADVANCED_REQUEST : RequestType.REQUEST);
    }
  
    @ApiOperation({summary: 'Request message'})
    @ApiBody({ description: 'Requst fix body', type: RequestFixesMessage })
    @ApiResponse({status: 200, type: ResponseMessage})
    @Post("/fix")
    async fix(@Body() requestFixesMessage: RequestFixesMessage): Promise<ResponseMessage> {
      return this.generatorService.requestFix(requestFixesMessage);
    }
    
    @ApiOperation({summary: 'Request message'})
    @ApiBody({ description: 'Requst doc body', type: RequestDoc })
    @ApiResponse({status: 200, type: ResponseMessage})
    @Post("/doc")
    async fixes(@Body() requestDoc: RequestDoc): Promise<ResponseMessage> {
      return this.generatorService.requestDoc(requestDoc);
    }

    @ApiOperation({summary: 'Request message'})
    @ApiBody({ description: 'Requst assemble body', type: RequestAssembleCode })
    @ApiResponse({status: 200, type: ResponseAssembleCode})
    @Post("/assemble")
    async assemble(@Body() requestAssembleCode: RequestAssembleCode): Promise<ResponseAssembleCode> {
      return this.generatorService.assemble(requestAssembleCode);
    }

    @ApiOperation({summary: 'Request message'})
    @ApiBody({ description: 'Requst constructor detail body', type: RequestConstructorDetail })
    @ApiResponse({status: 200, type: ResponseMessage})
    @Post("/detail/constructor")
    async costructorDetail(@Body() requestConstructorDetail: RequestConstructorDetail): Promise<ResponseMessage> {
    return this.generatorService.requestConstructorDetails(requestConstructorDetail);
    }
    
}