import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateRolePermissionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    roleId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    permissionId: string;
}
export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {}
