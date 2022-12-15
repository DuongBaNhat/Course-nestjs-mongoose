import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min, IsOptional } from "class-validator";

export class CreateLevelDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;


}
export class UpdateLevelDto extends PartialType(CreateLevelDto) {
    @ApiProperty({ default: 1 })
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    @IsOptional()
    order?: number;
}

