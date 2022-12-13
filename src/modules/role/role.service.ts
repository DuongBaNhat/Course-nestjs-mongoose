import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Role, RoleDocument } from 'src/database/entities/role.schema';
import { PaginationParams } from 'src/database/util/pagination.util';
import { CreateRoleDto, UpdateRoleDto } from '../../database/dto/role.dto';

@Injectable()
export class RoleService {

  constructor(
    @InjectModel(Role.name) private roleModel: Model<RoleDocument>,
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    const createdItem = new this.roleModel(createRoleDto);
    await createdItem.populate('permissions');
    return createdItem.save().catch(err => err);
  }

  async findAll(filter: PaginationParams) {
    const { page, size, textSearch } = filter;
    const skip = (page - 1) * size, limit = size;

    let filters: FilterQuery<RoleDocument> = {};
    //search
    if (textSearch) {
      filters.$text = {
        $search: textSearch,
      };
    }

    const total = await this.roleModel.find(filters).count();

    let query = this.roleModel.find(filters);
    const content = await query.sort({ _id: 1 }).skip(skip).limit(limit);

    return { content, total, page, size };
  }

  async findOne(id: string) {
    return this.roleModel.findById(id)
      .catch(err => {
        return err;
      });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    return await this.roleModel.findByIdAndUpdate(id, updateRoleDto)
      .catch(err => err);
  }

  async remove(id: string) {
    return await this.roleModel.findByIdAndDelete(id)
      .catch(err => err);
  }

  async getPermissionByRoleId(roleId: string) {
    return this.roleModel.findById(roleId).populate('permissions')
      .catch(err => err);
  }
}
