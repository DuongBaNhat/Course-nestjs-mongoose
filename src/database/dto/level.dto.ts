import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateLevelDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

}
export class UpdateLevelDto extends PartialType(CreateLevelDto) {}

