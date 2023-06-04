import { Injectable, Logger } from '@nestjs/common';
import {ChatgptModelType} from "../../../generator/entities/inner/chatgpt.model.type";
import generateRandomString from "../../../utils/random-utils"
//import extract from "../../../utils/extract-json-from-string";


const fs = require('fs');
const path = require('path');


import {Configuration, OpenAIApi} from "openai";
import {ChatgptResponse} from "./entities/chatgpt.response";

@Injectable()
export class ChatGptApiService {
    private readonly logger = new Logger(ChatGptApiService.name);
    
    OUTPUTS_CONTRACTS_PATH_NAME = 'contracts'
    
    private OPENAI;
    
    constructor() {
        console.log("process.env.OPENAI_API_KEY: ", process.env.OPENAI_API_KEY)
        
        const configuration = new Configuration({
            organization: "org-yl0wJLHM9avOVzWu6lxYBvx9",
            apiKey: process.env.OPENAI_API_KEY,
        });
        
        this.OPENAI = new OpenAIApi(configuration);
        this.logger.log('=== OpenAi init === ');
        
//        const openai = new OpenAIApi(configuration);
//        const response = await openai.listEngines();
    }
    
    public async sendMessage(message: string, gptType: ChatgptModelType): Promise<ChatgptResponse> {
//        let jsonString = "{\"Token.sol\": \"pragma solidity ^0.8.0;\\n\\nimport '@openzeppelin/contracts/token/ERC20/ERC20.sol';\\n\\ncontract Token is ERC20 {\\n    constructor(uint256 initialSupply) ERC20('Token', 'TKN') {\\n        _mint(msg.sender, initialSupply);\\n    }\\n}\", \"ERC20.sol\": \"pragma solidity ^0.8.0;\\n\\nimport '@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol';\\nimport '@openzeppelin/contracts/token/ERC20/IERC20.sol';\\nimport '@openzeppelin/contracts/utils/Context.sol';\\n\\ncontract ERC20 is Context, IERC20, IERC20Metadata {\\n    mapping(address => uint256) private _balances;\\n    mapping(address => mapping(address => uint256)) private _allowances;\\n    uint256 private _totalSupply;\\n\\n    string private _name;\\n    string private _symbol;\\n\\n    constructor(string memory name_, string memory symbol_) {\\n        _name = name_;\\n        _symbol = symbol_;\\n    }\\n\\n    // Implement all ERC20 functions\\n}\", \"IERC20.sol\": \"pragma solidity ^0.8.0;\\n\\ninterface IERC20 {\\n    function totalSupply() external view returns (uint256);\\n    function balanceOf(address account) external view returns (uint256);\\n    function transfer(address recipient, uint256 amount) external returns (bool);\\n    function allowance(address owner, address spender) external view returns (uint256);\\n    function approve(address spender, uint256 amount) external returns (bool);\\n    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);\\n\\n    event Transfer(address indexed from, address indexed to, uint256 value);\\n    event Approval(address indexed owner, address indexed spender, uint256 value);\\n}\", \"IERC20Metadata.sol\": \"pragma solidity ^0.8.0;\\n\\nimport './IERC20.sol';\\n\\ninterface IERC20Metadata is IERC20 {\\n    function name() external view returns (string memory);\\n    function symbol() external view returns (string memory);\\n    function decimals() external view returns (uint8);\\n}\", \"Context.sol\": \"pragma solidity ^0.8.0;\\n\\ncontract Context {\\n    constructor() {\\n    }\\n\\n    function _msgSender() internal view virtual returns (address) {\\n        return msg.sender;\\n    }\\n\\n    function _msgData() internal view virtual returns (bytes calldata) {\\n        return msg.data;\\n    }\\n\\n}\", \"openzeppelin.json\": \"{\\n  \\\"dependencies\\\": {\\n    \\\"@openzeppelin\\\": {\\n      \\\"contracts\\\": \\\"4.1.0\\\"\\n    }\\n  },\\n  \\\"compiler\\\": {\\n    \\\"solc\\\": {\\n      \\\"version\\\": \\\"0.8.2\\\",\\n      \\\"optimizer\\\": {\\n        \\\"enabled\\\": true,\\n        \\\"runs\\\": 200\\n      }\\n    }\\n  }\\n}\"}";
        let chatgptResponse = await this.callOpenAI(message, 0, gptType);
//        const obj = JSON.parse(chatgptResponse.choices[0].message.content);
//        let keys = Object.keys(obj);
//        
//        let programName = chatgptResponse.id;
//        for(let i = 0; i < keys.length; i++) {
//            let key = keys[i];
//            console.log("File", key.replace("/", ''));
//            console.log("Code", obj[key]);
////            this.saveGenerationToFiles(programName, key.replace("/", ''), obj[key]);
//        }
        
        return chatgptResponse;
    }
    
    private saveGenerationToFiles(programName, fileName, fileContent) {
        const dirPath = path.join(__dirname, this.OUTPUTS_CONTRACTS_PATH_NAME, programName);
        const filePath = path.join(__dirname, this.OUTPUTS_CONTRACTS_PATH_NAME, programName, fileName);
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                this.logger.error(`Error when make path for save generation. program: ${programName}, file: ${fileName}, content: ${fileContent}`);
                throw err;
            }

            fs.writeFile(filePath, fileContent, (err) => {
                if (err) {
                    this.logger.error(`Error when save generation. program: ${programName}, file: ${fileName}, content: ${fileContent}`);
                    throw err;
                }
                
                console.log('File be saved to ', fileName);
            });
        });
        
        fs.appendFile(filePath, fileContent, (err) => {
            if (err) throw err;
            
        });
    }
    
    
    public async sendMessageTmp(message: string, gptType: ChatgptModelType): Promise<ChatgptResponse> {
       return this.callOpenAI(message, 0, gptType);
            
//        
////        const completion = await openai.createCompletion({
////            model: "text-davinci-003",
////            prompt: "Hello world",
////        });
////        console.log(completion.data.choices[0].text);
//
//        const response = axios
//      .get(url, {
//          timeout: 80_000, // 80 sec
//      })
//      .then((data) => {
//         console.log('Response data: ', data.data);
//      })
//      .catch((e) => {
//          const errorMessage = `Error when load ${ExchangerType.RAMSES} pairs.`;
//          this.logger.error(errorMessage, e);
//          throw new ExternalApiException(errorMessage);
//      });
//
//        return await response;
    }
    
    async callOpenAI(prompt: string, attempt: number, gptType: ChatgptModelType) : Promise<ChatgptResponse> {
//        if (attempt > 3) {
//            return null;
//        }
//
//        if (attempt > 0) {
//            prompt = "YOU MUST ONLY RESPOND WITH VALID JSON OBJECTS\N" + prompt;
//        }

        try {
            const response = await this.OPENAI.createChatCompletion({
                model: gptType,
                messages: [{ role: 'system', name: process.env.APP_NAME, content: prompt }],
            });

            const chatReponse: ChatgptResponse = response.data;
            console.log("response: ", response);
            console.log(chatReponse);
            console.log(response.data.choices);
            console.log(response.data.choices[0]);
            console.log(response.data.choices[0].message);
            console.log(response.data.choices[0].message.content);

            return chatReponse;
        } catch(e) {
            this.logger.error(`Error when request message: ${prompt}. gptModel: ${gptType}`, e)
        }

//        const responseObject = this.cleanAndProcess(response.data.choices[0].message.content);
//        if (responseObject) {
//            return responseObject;
//        }
//
//        return await this.callOpenAI(prompt, attempt + 1, gptType);
    }
    
//    cleanAndProcess(text) {
//        const extractedJson = extract(text)[0];
//
//        if (!extractedJson) {
//            return null;
//        }
//
//        return extractedJson;
//    }
    
}
