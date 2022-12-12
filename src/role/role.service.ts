import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role } from 'src/database/entities/role.schema';
import { RolePermission } from 'src/database/entities/role_permission.schema';
import { CreateRoleDto, UpdateRoleDto } from '../database/dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<Role>,
    @InjectModel(RolePermission.name) private rolePermissionModel: Model<RolePermission>,
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    const { name, permissionIds } = createRoleDto;

    //create role
    const createRole = new this.roleModel({ name });
    const role = await createRole.save();

    //create rolePermission
    const rolePermissions = this.createRolePermisssionMany(role.id, permissionIds);

    return { role, rolePermissions };
  }

  findAll() {
    return this.roleModel.find();
  }

  async findOne(id: string) {
    return this.roleModel.findById(id)
      .catch(err => {
        return err;
      });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { name, permissionIds } = updateRoleDto;

    //update role
    const role = await this.roleModel.findByIdAndUpdate(id, { name: name })
      .catch((err) => { throw new BadRequestException(err) });
    if (!role) {
      throw new BadRequestException('Not found role');
    }
    //create rolePermission
    let rolePermission: any;
    if (permissionIds) {
      rolePermission = await this.createRolePermisssionMany(id, permissionIds)
        .catch(err => { throw new BadRequestException(err) });
    }
    return { role, rolePermission };
  }

  async remove(id: string) {
    await this.rolePermissionModel.deleteMany({ roleId: id });
    return await this.roleModel.deleteOne({ _id: id })
      .catch(err => err);
  }

  private async createRolePermisssionMany(roleId: string, permissionIds: string[]) {
    await this.rolePermissionModel.deleteMany({ roleId: roleId });

    let rolePers = permissionIds.map((perId) => {
      const rolePer: RolePermission = {
        roleId: roleId,
        permissionId: perId,
      };
      return rolePer;

    });

    return this.rolePermissionModel.insertMany(rolePers);
  }

}
