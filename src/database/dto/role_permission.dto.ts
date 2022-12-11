import { PartialType } from "@nestjs/swagger";

export class CreateRolePermissionDto {
    roleId: string;
    permissionId: string;
}
export class UpdateRolePermissionDto extends PartialType(CreateRolePermissionDto) {}
