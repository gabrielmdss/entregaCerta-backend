class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    /** Erro original (apenas para log no servidor; nunca enviado ao cliente). */
    public readonly cause?: unknown;

    constructor(message: string, statusCode = 400, cause?: unknown) {
      this.message = message;
      this.statusCode = statusCode;
      this.cause = cause;
    }
  }

  export default AppError;
