import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class CreateRoleDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsArray({each: true})
    @ArrayNotEmpty()
    @IsOptional()
    permissionIds: string[];
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
