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
    startDate: Date;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    endDate: Date;

    @ApiProperty({default: 'active'})
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty({default: 'percent'})
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;
}
export class UpdatePromotionDto extends PartialType(CreatePromotionDto) { }
