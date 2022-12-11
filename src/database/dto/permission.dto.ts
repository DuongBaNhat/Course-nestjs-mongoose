import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreatePermissionDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;
}
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
