import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChargeDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    paymentMethodId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

export class CreateChargeDto extends ChargeDto { }
export class UpdateChargeDto extends ChargeDto { }
