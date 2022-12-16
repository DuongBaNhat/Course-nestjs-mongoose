import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePromotionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    percent: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    fixed: number;
}
export class UpdatePromotionDto extends PartialType(CreatePromotionDto) { }
