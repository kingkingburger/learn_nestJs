import { Injectable } from '@nestjs/common';
import { CreateADto } from './dto/create-a.dto';
import { UpdateADto } from './dto/update-a.dto';
import { Repository } from 'typeorm';
import { A } from './entities/a.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BAttribute } from '../b/entities/b.entity';

@Injectable()
export class AService {
  constructor(
    @InjectRepository(A) private readonly aRepository: Repository<A>,
  ) {}

  async create(createADto: CreateADto) {
    return await this.aRepository.save(createADto);
  }

  async findAll(name) {
    // const result = await this.aRepository
    //   .createQueryBuilder('a')
    //   .where('a.name = :name', { name })
    //   .innerJoin('a.Bs', 'bs')
    //   .getMany();
    // return result;

    return await this.aRepository.find({
      where: { name: name },
      relations: {
        Bs: true,
      },
    });
  }
  async findAllt(name) {
    // const result = await this.aRepository
    //   .createQueryBuilder('a')
    //   .where('a.name = :name', { name })
    //   .innerJoin('a.Bs', 'bs')
    //   .getMany();
    // return result;
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
