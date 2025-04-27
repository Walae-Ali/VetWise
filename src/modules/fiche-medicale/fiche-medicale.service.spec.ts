import { Test, TestingModule } from '@nestjs/testing';
import { FicheMedicaleService } from './fiche-medicale.service';

describe('FicheMedicaleService', () => {
  let service: FicheMedicaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FicheMedicaleService],
    }).compile();

    service = module.get<FicheMedicaleService>(FicheMedicaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
