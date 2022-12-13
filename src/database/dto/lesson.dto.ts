import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateLessonDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

}
export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
