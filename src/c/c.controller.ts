import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CService } from './c.service';
import { CreateCDto } from './dto/create-c.dto';
import { UpdateCDto } from './dto/update-c.dto';

@Controller('c')
export class CController {
  constructor(private readonly cService: CService) {}

  @Post()
  create(@Body() createCDto: CreateCDto) {
    return this.cService.create(createCDto);
  }

  @Get()
  findAll() {
    return this.cService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCDto: UpdateCDto) {
    return this.cService.update(+id, updateCDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cService.remove(+id);
  }
}
