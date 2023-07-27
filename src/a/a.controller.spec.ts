import { Test, TestingModule } from '@nestjs/testing';
import { AController } from './a.controller';
import { AService } from './a.service';

describe('AController', () => {
  let controller: AController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AController],
      providers: [AService],
    }).compile();

    controller = module.get<AController>(AController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
