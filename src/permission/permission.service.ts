import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePermissionDto, UpdatePermissionDto } from 'src/database/dto/permission.dto';
import { Permission, PermissionDocument } from '../database/entities/permission.schema';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission.name) private permissionModel: Model<PermissionDocument>) { }

  create(createPermissionDto: CreatePermissionDto) {
    const createPermission = new this.permissionModel(createPermissionDto);
    return createPermission.save();
  }

  findAll() {
    return this.permissionModel.find();
  }

  findOne(id: string) {
    return this.permissionModel.findById(id);
  }

  update(id: string, updatePermissionDto: UpdatePermissionDto) {
    return this.permissionModel.findByIdAndUpdate(id, updatePermissionDto);
  }

  remove(id: string) {
    return this.permissionModel.findByIdAndDelete(id);
  }
}
