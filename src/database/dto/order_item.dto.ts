import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateOrderItemDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}
export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
