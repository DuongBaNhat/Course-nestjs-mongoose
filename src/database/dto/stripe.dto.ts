import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

class StripeDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string

}

export class CreateStripeDto extends StripeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    orderId: string;
}

export class CreateStripe extends StripeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    payment_method: string
}

