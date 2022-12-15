import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { isNotEmptyObject } from "class-validator";
import { Response } from "express";
import { ResponseTransform, TransformResponse } from "./transformer.response";

@Catch()
export class ExceptionCommon implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const { httpAdapter } = this.httpAdapterHost;

        const httpStatus = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody: ResponseTransform = {
            status: 'error',
            status_code: httpStatus,
            data: { name: exception.name, message: exception.message },
        }

        console.log(`>>>>>
        ${exception}`);
        console.log('<<<<<');

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
    }
}