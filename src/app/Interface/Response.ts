
export class Response {
  Message: string;
  Status: string;

  constructor(
    message: string,
    status: string
  ) {
      this.Message = message;
      this.Status = status;
  }
}
