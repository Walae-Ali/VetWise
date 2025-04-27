import { Test, TestingModule } from '@nestjs/testing';
import { FicheMedicaleController } from './fiche-medicale.controller';
import { FicheMedicaleService } from './fiche-medicale.service';

describe('FicheMedicaleController', () => {
  let controller: FicheMedicaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FicheMedicaleController],
      providers: [FicheMedicaleService],
    }).compile();

    controller = module.get<FicheMedicaleController>(FicheMedicaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
