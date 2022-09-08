import { Test, TestingModule } from '@nestjs/testing';
import { PythonLabController } from './python-lab.controller';
import { PythonLabService } from './python-lab.service';

describe('PythonLabController', () => {
  let controller: PythonLabController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PythonLabController],
      providers: [PythonLabService],
    }).compile();

    controller = module.get<PythonLabController>(PythonLabController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
