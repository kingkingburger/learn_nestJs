import { Injectable } from '@nestjs/common';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
import { Repository } from 'typeorm';
import { A } from './entities/a.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBDto } from '../b/dto/create-b.dto';
import { B } from '../b/entities/b.entity';

@Injectable()
export class AService {
  constructor(
    @InjectRepository(A) private readonly aRepository: Repository<A>,
  ) {}

  async create(createADto: CreateADto) {
    createADto.Bs = [{ name: 'b Test' }] as B[];
    return await this.aRepository.save(createADto);
  }

  async findAll(name) {
    const fullData = await this.aRepository.find({
      where: { name: name },
      relations: {
        Cs: {
          Bs: true,
        },
      },
    });

    const filteredData = fullData.map((item) => {
      // Create a copy of the item object without the 'Cs' property
      const { Cs, ...itemWithoutCs } = item;
      return {
        // Spread the original item data without 'Cs'
        ...itemWithoutCs,
        // Replace Cs with just the Bs data
        Bs: item.Cs.map((csItem) => csItem.Bs), // Change 'Cs' to 'Bs' here
      };
    });
    return filteredData;
  }
  async findAllt(name) {
    return await this.aRepository.find({
      where: { name: name },
      relations: { Bs: true },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} a`;
  }

  async update(id: number, updateADto: UpdateADto) {
    return await this.aRepository.update(id, updateADto);
  }

  async remove(id: number) {
    return await this.aRepository.delete(id);
  }
}
