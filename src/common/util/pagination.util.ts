import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, Min, IsString } from "class-validator";
import { FilterQuery, Model, Query, QueryWithHelpers, SortOrder } from "mongoose";

export class PaginationParams {
    @ApiProperty({ default: 1, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number;

    @ApiProperty({ default: 20, required: false })
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    size?: number;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    textSearch?: string;
}

export class PaginationResponse {
    content: any;
    total: number;
    page: number;
    size: number;
}
//pagination
export class PaginationParam {
    query: any;
    total: number;
    page: number;
    size: number;
    sort: string;
}

export async function toPaginationResponse(params: PaginationParam) {
    const { page, query, size, sort, total } = params;
    const skip = (page - 1) * size, limit = size;

    let sortOrder: SortOrder = 'desc';
    let key = '_id';
    if (sort) {
        let sorts = sort.split('-');
        key = sorts[1];
        let value = sorts[0];
        if (value === 'ascend') {
            sortOrder = 'asc';
        }
    }


    let content = await query.sort({ [`${key}`]: sortOrder }).skip(skip).limit(limit);

    const result: PaginationResponse = {
        content: content,
        total: total,
        page: page,
        size: size
    }

    return result;
}