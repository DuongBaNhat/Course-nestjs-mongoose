import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { RolePermission } from "../entities/role_permission.schema";
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
    permissions: RolePermission[];
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }
