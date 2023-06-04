import { Module } from '@nestjs/common';
import { ChatGptApiService } from "./api/openai/chatgpt.api.service";

@Module({
    providers: [
        ChatGptApiService
    ],
    exports: [
        ChatGptApiService
    ]
})
export class ExternalModule {}
