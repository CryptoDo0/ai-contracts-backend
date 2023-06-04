import {HttpCode, HttpException, HttpStatus} from "@nestjs/common";

export class PromtApiException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.BAD_REQUEST);
        this.name = 'ExchangerRequestError';
    }
}