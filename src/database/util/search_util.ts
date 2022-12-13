import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsNumber, Min, IsString } from "class-validator";

export class SearchFilter {
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


