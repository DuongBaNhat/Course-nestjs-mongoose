import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray } from "class-validator";

export class CustomerDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public password: string;
}
export class CreateCustomerDto extends CustomerDto { }
export class UpdateCustomerDto extends PartialType(CustomerDto) {
    @ApiProperty()
    @IsArray()
    @IsString({ each: true })
    @IsNotEmpty({ each: true })
    public paymentMethodIds: string[];
}

export class AddCardCustomerDto {
    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // public stripeCustomerId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public cardToken: string;
}

export class CardDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    number: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    exp_month: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    exp_year: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cvc: string;
}
