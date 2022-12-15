import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto, UpdateRoleDto } from '../../database/dto/role.dto';
import { ApiTags } from '@nestjs/swagger/dist';
import { PaginationParams } from 'src/common/util/pagination.util';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() filter: PaginationParams) {
    return this.roleService.findAll(filter);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }

  @Get('permission-of-role/:id')
  getPermissionByRoleId(@Param('id') roleId: string) {
    return this.roleService.getPermissionByRoleId(roleId);
  }
}
