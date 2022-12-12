import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    code: string;
}
export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
