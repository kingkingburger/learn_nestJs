import { Test, TestingModule } from '@nestjs/testing';
import { CService } from './c.service';

describe('CService', () => {
  let service: CService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CService],
    }).compile();

    service = module.get<CService>(CService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
