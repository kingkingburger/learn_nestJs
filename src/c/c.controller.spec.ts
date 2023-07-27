import { Test, TestingModule } from '@nestjs/testing';
import { CController } from './c.controller';
import { CService } from './c.service';

describe('CController', () => {
  let controller: CController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CController],
      providers: [CService],
    }).compile();

    controller = module.get<CController>(CController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
