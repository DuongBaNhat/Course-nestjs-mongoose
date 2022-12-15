import { ExecutionContext, CallHandler, NestInterceptor } from "@nestjs/common";
// import { Response } from "@sendgrid/helpers/classes";
import { map, Observable } from "rxjs";

export interface Response<T> {
}

export class ResponseTransform {
    status: string;
    status_code: number;
    data: any;
}

export class TransformResponse<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Response<T>> {
        return next
            .handle()
            .pipe(
                map((data): ResponseTransform => ({
                    status: 'success',
                    status_code: context.switchToHttp().getResponse().statusCode,
                    data: data,
                }))
            );
    }

}