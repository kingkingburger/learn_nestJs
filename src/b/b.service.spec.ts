import { Test, TestingModule } from '@nestjs/testing';
import { BService } from './b.service';

describe('BService', () => {
  let service: BService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BService],
    }).compile();

    service = module.get<BService>(BService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
