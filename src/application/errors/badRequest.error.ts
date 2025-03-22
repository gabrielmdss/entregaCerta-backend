export default class BadRequest {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly error: any;

    constructor(message: string, statusCode: number, error: any){
        this.message = message;
        this.statusCode = statusCode;
        this.error = error
    }
}