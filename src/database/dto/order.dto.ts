import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional, IsDate, IsNumber, IsDateString } from "class-validator";

export class CreateOrderDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    @IsOptional()
    items: string[];

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    status: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    total: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    discount: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsDateString()
    @IsNotEmpty()
    date: Date;

}
export class UpdateOrderDto extends PartialType(CreateOrderDto) { }

