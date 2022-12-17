import { Injectable } from '@nestjs/common';
import { CreateChargeDto, UpdateChargeDto } from '../../database/dto/charge.dto';

@Injectable()
export class ChargeService {
  create(createChargeDto: CreateChargeDto) {
    return 'This action adds a new charge';
  }

  findAll() {

  }

  findOne(id: string) {
    return `This action returns a #${id} charge`;
  }

  update(id: string, updateChargeDto: UpdateChargeDto) {
    return `This action updates a #${id} charge`;
  }

  remove(id: string) {
    return `This action removes a #${id} charge`;
  }
}
