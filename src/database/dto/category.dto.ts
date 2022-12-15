import { ApiProperty, PartialType, PickType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ default: 1 })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    order: number;
}
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) { }
export class UpCategoryDto extends PickType(CreateCategoryDto, ['order'] as const) { }
