import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import path from 'path';
import { CreateRolePermissionDto } from 'src/database/dto/role_permission.dto';
import { Role, RoleDocument } from 'src/database/entities/role.schema';
import { RolePermission } from 'src/database/entities/role_permission.schema';
import { CreateRoleDto, UpdateRoleDto } from '../database/dto/role.dto';

@Injectable()
export class RoleService {

  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
    @InjectModel(RolePermission.name) private rolePermissionModel: Model<RolePermission>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const createdItem = new this.roleModel(createRoleDto);
    await createdItem.populate('permissions');
    return createdItem.save();
  }

  findAll() {
    return this.roleModel.find()
  }

  async findOne(id: string) {
    return this.roleModel.findById(id)
      .catch(err => {
        return err;
      });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { name, permissions } = updateRoleDto;

    //update role
    let role: any;
    if (name) {
      role = await this.roleModel.findByIdAndUpdate(id, { name: name })
        .catch((err) => { throw new BadRequestException(err) });
      if (!role) {
        throw new BadRequestException('Not found role');
      }
    }

    //create rolePermission
    let rolePermission: any;
    if (permissions) {
      rolePermission = await this.createRolePermisssionMany(id, permissions)
        .catch(err => { throw new BadRequestException(err) });
    }
    return { role, rolePermission };
  }

  async remove(id: string) {
    await this.rolePermissionModel.deleteMany({ roleId: id });
    return await this.roleModel.deleteOne({ _id: id })
      .catch(err => err);
  }

  async getPermissionByRoleId(roleId: string) {
    return this.roleModel.findById(roleId).populate('permissions')
      
    const pers = await this.rolePermissionModel.find({ role: {_id: roleId} })
      .populate('permission')
      .catch(err => err);

    return pers;
  }

  //////////// PRIVATE METHOD ///////////////////
  private async createRolePermisssionMany(roleId: string, permissions: RolePermission[]) {
    await this.rolePermissionModel.deleteMany({ role: {roleId }});

    let rolePers = permissions.map((per) => {
      const rolePer = {
        role: { roleId },
        permission: per
      };
      return rolePer;

    });

    return await this.rolePermissionModel.insertMany(rolePers);
  }


}
