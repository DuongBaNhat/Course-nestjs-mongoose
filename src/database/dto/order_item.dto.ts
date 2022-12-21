import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    idItem: string;

    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // name: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    // @ApiProperty()
    // @IsNumber()
    // @IsNotEmpty()
    // price: number;
}
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) { }

export class CreateOrderItem {
    idItem: string;
    name: string;
    amount: number;
    price: number;
}