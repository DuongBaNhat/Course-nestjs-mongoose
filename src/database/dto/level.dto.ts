import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateLevelDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({default: 1})
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    order: number;
}
export class UpdateLevelDto extends PartialType(CreateLevelDto) {}

