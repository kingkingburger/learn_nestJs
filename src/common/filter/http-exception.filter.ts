import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const err = exception.getResponse() as
      | { message: any; statusCode: number }
      | { error: string; statusCode: 400; message: string[] }; // class-validator의 타입

    console.log(status, err.message, exception.message);

    const json = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: err.message, // class-validator가 발생시킨 에러, 내가 발생시킨 error
    };

    response.status(status).json(json);
  }
}
