import { Module } from '@nestjs/common';
import { DossierMedicalService } from './dossier-medical.service';
import { DossierMedicalController } from './dossier-medical.controller';
import { DossierMedical } from './entities/dossier-medical.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from 'src/animal/entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DossierMedical,Animal])],
  controllers: [DossierMedicalController],
  providers: [DossierMedicalService],
})
export class DossierMedicalModule {}
