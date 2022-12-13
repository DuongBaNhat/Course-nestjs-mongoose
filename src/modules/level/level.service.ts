import { Injectable } from '@nestjs/common';
import { CreateLevelDto, UpdateLevelDto } from '../../database/dto/level.dto';

@Injectable()
export class LevelService {
  create(createLevelDto: CreateLevelDto) {
    return 'This action adds a new level';
  }

  findAll() {
    return `This action returns all level`;
  }

  findOne(id: number) {
    return `This action returns a #${id} level`;
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
