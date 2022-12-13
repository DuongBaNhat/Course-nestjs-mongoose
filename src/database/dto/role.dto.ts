import { ApiProperty, PartialType } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumberString, IsOptional, IsString } from "class-validator";
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
    permissions: string[];
}
export class UpdateRoleDto extends PartialType(CreateRoleDto) { }

export class RoleSearchFilter {
    @ApiProperty({
        required: false,
        default: 1,
      })
      @IsNumberString()
      @IsOptional()
      page?: number;
    
      @ApiProperty({
        required: false,
        default: 20,
      })
      @IsNumberString()
      @IsOptional()
      size?: number;
    
      @ApiProperty({
        required: false,
        default: 'descend-createdOnDate',
      })
      @IsString()
      @IsOptional()
      sort?: string;
    
      @ApiProperty({
        required: false,
      })
      @IsString()
      @IsOptional()
      fullTextSearch?: string;
}
