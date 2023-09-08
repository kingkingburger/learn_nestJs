import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { winstonLogger } from './winston.util';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent');

    res.on('finish', () => {
      const { statusCode } = res;

      if (statusCode >= 400 && statusCode < 500)
        winstonLogger.warn(
          `[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`,
        );
      else if (statusCode >= 500)
        winstonLogger.error(
          `[${method}]${originalUrl}(${statusCode}) ${ip} ${userAgent}`,
        );
    });
    const tempUrl = req.method + ' ' + req.baseUrl.split('?')[0];
    const _headers = req.headers ? req.headers : {};
    const _query = req.query ? req.query : {};
    const _body = req.body ? req.body : {};
    const _url = tempUrl ? tempUrl : {};

    winstonLogger.log(
      JSON.stringify({
        url: _url,
        headers: _headers,
        query: _query,
        body: _body,
      }),
    );
    next();
  }
}
