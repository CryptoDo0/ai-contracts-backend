import {Inject, Injectable, Logger} from '@nestjs/common';
import {RequestMessage} from "./entities/dto/request.message.dto";
import {ResponseMessage} from "./entities/dto/response.message.dto";
import {ChatGptApiService} from "../external/api/openai/chatgpt.api.service";
import {ChatgptModelType} from "./entities/inner/chatgpt.model.type";
import {PromtService} from "../promt/promt.service";
import {GENERATED_RESPONSE_REPOSITORY} from "../constants";
import {GeneratedResponse} from "./entities/generated.response.model";
import {RequestFixesMessage} from "./entities/dto/request.fixes.message.dto";
import {RequestDoc} from "./entities/dto/request.doc.dto";
import {ExternalApiException} from "../exceptions/external.api.exception";
import {RequestType} from './entities/inner/requestType';
import {FullPromt} from "../promt/entities/inner/full.promt";
import {RequestConstructorDetail} from "./entities/dto/request.constructor.detail.dto";
import {RequestAssembleCode} from "./entities/dto/request.assemble.dto";
import {FlattenService} from "../flatten/flatten.service";
import {ResponseAssembleCode} from "./entities/dto/response.assemble.message.dto 1";


@Injectable()
export class GeneratorService {
    private readonly logger = new Logger(GeneratorService.name);

    constructor(
        @Inject(GENERATED_RESPONSE_REPOSITORY) private generatedResponseRepository: typeof GeneratedResponse,
        private chatGptApiService: ChatGptApiService,
        private flattenService: FlattenService,
        private promtService: PromtService) {
    }

    async message(requestMessage: RequestMessage, type: RequestType): Promise<ResponseMessage> {
        this.logger.log("Request message: ", requestMessage);
        let fullPromt;
        if (type === RequestType.DOCUMENTATION || type === RequestType.CONSTRUCTOR_DETAIL) {
            fullPromt = new FullPromt();
            fullPromt.content = requestMessage.promt;
        } else {
            fullPromt = await this.promtService.getFullPromt(requestMessage.promt);
        }

        this.logger.log("Full promt: ", fullPromt)

        if (!requestMessage.advance) {
            const chatgptResponse = await this.chatGptApiService.sendMessage(fullPromt.content, ChatgptModelType.GPT_4);
            let content = chatgptResponse.choices[0].message.content;
            //content = content.replace(/\n/g, " ");
            let answer = await this.generatedResponseRepository.create({
                sessionId: chatgptResponse.id,
                content: content,
                userPromt: requestMessage.promt,
                promtId: fullPromt.promt ? fullPromt.promt.id : null,
                promptTokens: chatgptResponse.usage.prompt_tokens,
                completionTokens: chatgptResponse.usage.completion_tokens,
                totalTokens: chatgptResponse.usage.total_tokens,
                requestType: type
            });

            return new ResponseMessage(chatgptResponse.id, content, answer.id);
        }

        this.logger.log("Advance request not availible")
        this.logger.error("Advance request not availible")
        return null;
    }

    public async requestFix(requestFixesMessage: RequestFixesMessage): Promise<ResponseMessage> {
        let response = await this.getGeneratedResponse(requestFixesMessage.generatedResponseId);
        let fixItMessage = `Rewrite this code and fix error. Error: "${requestFixesMessage.errorMessage}", Code: \`\`\`solidity ${response.content}`;
        return this.message(new RequestMessage(response.sessionId, fixItMessage, requestFixesMessage.advance), RequestType.FIX);
    }

    public async requestDoc(requestDoc: RequestDoc) {
        let response = await this.getGeneratedResponse(requestDoc.generatedResponseId);
        let docItMessage = `I would like to get short descriptions and explanations of the methods in the following code. Your returns information in raw json format {\"method\": \"<description>\"} directly in the response content.
        Code: \`\`\`solidity ${response.content}\`\`\`
        Remember you don't talk english, don't explain anything, returns just raw json without line breaks`;
        return this.message(new RequestMessage(response.sessionId, docItMessage, false), RequestType.DOCUMENTATION);
    }

    public async requestConstructorDetails(requestConstructorDetail: RequestConstructorDetail) {
        let response = await this.getGeneratedResponse(requestConstructorDetail.generatedResponseId);

        let docConstructorMessage = `You are a assist code generator API to generate description of about solidity name of constructor fields.
        Your returns description of solidity name of constructor fields in separated filed in raw json format {\"<constructor field name>\": \"<filed description>\"} directly in the response content. Create a constructor description:
        Code: \`\`\`solidity ${response.content}\`\`\`. Return only contructor names and description.
        Remember you don't talk english, don't explain anything, returns just raw json without line breaks`;
        return this.message(new RequestMessage(response.sessionId, docConstructorMessage, false), RequestType.CONSTRUCTOR_DETAIL);
    }

    async getGeneratedResponse(id: number): Promise<GeneratedResponse> {
        let response = await this.generatedResponseRepository.findOne({where: {id: id}})
        if (!response) {
            this.logger.log("Response not found by id: ", id);
            throw new ExternalApiException("Response not found by id: " + id);
        }

        return response;
    }

    async assemble(requestAssembleCode: RequestAssembleCode): Promise<ResponseAssembleCode>  {
        let response = await this.getGeneratedResponse(requestAssembleCode.generatedResponseId);
        const assembleCode = await this.flattenService.assemble(response.content);
        console.log("assembleCode: ", assembleCode)
        const assembleStringCode = JSON.stringify(assembleCode);

        return new ResponseAssembleCode("assemble", response.content, assembleStringCode, response.id);
    }
}
