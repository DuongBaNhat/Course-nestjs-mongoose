import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { 
    @ApiProperty({ default: 1 })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsOptional()
    order?: number;
}
export class UpCategoryDto extends PickType(UpdateCategoryDto, ['order'] as const) { }
