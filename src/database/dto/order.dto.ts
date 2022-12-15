import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty, IsOptional } from "class-validator";

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
}
export class UpdateOrderDto extends PartialType(CreateOrderDto) { }

