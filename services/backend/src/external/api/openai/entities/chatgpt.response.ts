import {ChatgptChoices} from "./chatgpt.choices";
import {ChatgptUsageInfo} from "./chatgpt.usage.info";

export class ChatgptResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    usage: ChatgptUsageInfo;
    choices: ChatgptChoices[];
}
