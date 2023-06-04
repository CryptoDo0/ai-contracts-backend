import { HttpException, HttpStatus } from "@nestjs/common";

export class ExternalApiException extends HttpException {
    messages;

    constructor(response) {
      super(response, HttpStatus.NOT_FOUND);
      this.messages = response;
    }
}