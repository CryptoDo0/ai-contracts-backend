
export class PromtException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ExchangerRequestError';
    }
}