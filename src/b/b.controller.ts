import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BService } from './b.service';
import { CreateBDto } from './dto/create-b.dto';
import { UpdateBDto } from './dto/update-b.dto';

@Controller('b')
export class BController {
  constructor(private readonly bService: BService) {}

  @Post()
  create(@Body() createBDto: CreateBDto) {
    return this.bService.create(createBDto);
  }

  @Get()
  findAll() {
    return this.bService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBDto: UpdateBDto) {
    return this.bService.update(+id, updateBDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bService.remove(+id);
  }
}
