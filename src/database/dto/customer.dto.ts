import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

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
    @IsString()
    @IsNotEmpty()
    public paymentMethodId: string;
}
