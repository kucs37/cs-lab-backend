import { Test, TestingModule } from '@nestjs/testing';
import { AdministratorController } from './administrator.controller';
import { AdministratorService } from './administrator.service';

describe('AdministratorController', () => {
  let controller: AdministratorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministratorController],
      providers: [AdministratorService],
    }).compile();

    controller = module.get<AdministratorController>(AdministratorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
