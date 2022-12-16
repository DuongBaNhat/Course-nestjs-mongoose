import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePromotionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date: Date;
}
export class UpdatePromotionDto extends PartialType(CreatePromotionDto) {}
