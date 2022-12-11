import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RolePermission } from 'src/database/entities/role_permission.schema';
import { CreateRolePermissionDto, UpdateRolePermissionDto } from '../database/dto/role_permission.dto';

@Injectable()
export class RolePermissionService {
  constructor(@InjectModel(RolePermission.name) private rolePermissionModel: Model<RolePermission>) {}

  create(createRolePermissionDto: CreateRolePermissionDto) {
    const createRolePermission = new this.rolePermissionModel(createRolePermissionDto);
    return createRolePermission.save();
  }

  findAll() {
    return this.rolePermissionModel.find();
  }

  findOne(id: string) {
    return this.rolePermissionModel.findById(id);

  }

  update(id: string, updateRolePermissionDto: UpdateRolePermissionDto) {
    return this.rolePermissionModel.findByIdAndUpdate(id, updateRolePermissionDto);

  }

  remove(id: string) {
    return this.rolePermissionModel.findByIdAndDelete(id);
  }
}
