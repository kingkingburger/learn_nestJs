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

  create(createADto: CreateADto) {
    return 'This action adds a new a';
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
        // Cs: {
        //   Bs: true,
        // },
      },
      // select: BAttribute,
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

  update(id: number, updateADto: UpdateADto) {
    return `This action updates a #${id} a`;
  }

  remove(id: number) {
    return `This action removes a #${id} a`;
  }
}
