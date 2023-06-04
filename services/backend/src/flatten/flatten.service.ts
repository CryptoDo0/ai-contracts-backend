import { Injectable } from '@nestjs/common';
import generateRandomString from "../utils/random-utils";
const { execSync } = require('child_process');

const fs = require('fs');

@Injectable()
export class FlattenService {
    
    private readFileSync(filePath: string): string {
        try {
            console.log("read file: ", filePath);
            const fileData = fs.readFileSync(filePath, { encoding: 'utf8' });
            console.log("fileData: ", fileData);
            return fileData;
        } catch (error) {
            throw new Error(`Error reading file: ${error.message}`);
        }
    }

    async assemble(code: string): Promise<string> {
        // Replace 'ls' with your desired Linux command
        //        const command = 'ls';
        //        const command = 'npx';
//        const command = 'npm';
        //        const args = ['-l', '/Users/dmitry/Projects/js/flatten-codes-test'];
        //        const args = ['hardhat', 'flatten', '/Users/dmitry/Projects/js/flatten-codes-test/contracts/TestErc20.sol', '>', '/Users/dmitry/Projects/js/flatten-codes-test/contracts/ResTestErc20.sol'];
        //        const args = ['hardhat', 'flatten', '/Users/dmitry/Projects/js/flatten-codes-test/contracts/TestErc20.sol'];
        //        const args = ['hardhat', 'flatten'];
        // const args = ['start', 'TestErc20.sol'];

        const options = {
            //            cwd: '/Users/dmitry/Projects/js/flatten-codes-test', // Set the custom path
                cwd: process.env.FLATTEN_PATH, // Set the custom path
                encoding: 'utf8'
        };
        
        let tempFileName = generateRandomString(20);
        let prefix = "contract_";
        let tempFullFileName = prefix + tempFileName + '.sol';
        let tempFullFlattenFileName = prefix + tempFileName + '_flat.sol';
        try {
//            fs.writeFileSync(process.env.FLATTEN_PATH + '/' + pathWithContracts + '/' + tempFullFileName, code, { encoding: 'utf8' });
            fs.writeFileSync(process.env.FLATTEN_PATH + '/' + tempFullFileName, code, { encoding: 'utf8' });
                console.log('File written successfully. name: ' + tempFullFileName);
        } catch (error) {
                console.error(`Error writing file: ${error}`);
        }

        //        npx hardhat flatten contracts/TestErc20.sol

        // Spawn the child process
//        const childProcess = spawn(command, args, options);
//        const command = 'npm start ' + pathWithContracts + '/' + tempFullFileName; // Replace with your desired Linux command
        const command = 'npm start ' + tempFullFileName; // Replace with your desired Linux command
        
           const output = execSync(command, options);
           console.log("output: ", output);

           let readResult = this.readFileSync(process.env.FLATTEN_PATH + '/out/' + tempFullFlattenFileName);
            console.log('ReadResult: ', readResult);
            return readResult;
    }
}
