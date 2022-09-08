import { Test, TestingModule } from '@nestjs/testing';
import { PythonLabService } from './python-lab.service';

describe('PythonLabService', () => {
  let service: PythonLabService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PythonLabService],
    }).compile();

    service = module.get<PythonLabService>(PythonLabService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
