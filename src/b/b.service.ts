import { Injectable } from '@nestjs/common';
import { CreateBDto } from './dto/create-b.dto';
import { UpdateBDto } from './dto/update-b.dto';

@Injectable()
export class BService {
  create(createBDto: CreateBDto) {
    return 'This action adds a new b';
  }

  findAll() {
    return `This action returns all b`;
  }

  findOne(id: number) {
    return `This action returns a #${id} b`;
  }

  update(id: number, updateBDto: UpdateBDto) {
    return `This action updates a #${id} b`;
  }

  remove(id: number) {
    return `This action removes a #${id} b`;
  }
}
