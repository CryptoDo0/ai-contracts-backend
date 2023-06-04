import {ChatgptMessage} from "./chatgpt.message";

export class ChatgptChoices {
    message: ChatgptMessage;
    finish_reason: string;
    index: number;
}
