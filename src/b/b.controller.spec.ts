import { Test, TestingModule } from '@nestjs/testing';
import { BController } from './b.controller';
import { BService } from './b.service';

describe('BController', () => {
  let controller: BController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BController],
      providers: [BService],
    }).compile();

    controller = module.get<BController>(BController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
