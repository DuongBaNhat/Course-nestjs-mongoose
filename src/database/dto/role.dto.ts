import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({each: true})
    @IsNotEmpty({each: true})
    @IsOptional()
    permissionIds: string[];
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
