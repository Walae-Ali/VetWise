import { Module } from '@nestjs/common';
import { FicheMedicaleService } from './fiche-medicale.service';
import { FicheMedicaleController } from './fiche-medicale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FicheMedicale } from './entities/fiche-medicale.entity';
import { Veterinaire } from 'src/utilisateur/entities/veterinaire.entity';
import { DossierMedical } from 'src/dossier-medical/entities/dossier-medical.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FicheMedicale,Veterinaire,DossierMedical])],
  controllers: [FicheMedicaleController],
  providers: [FicheMedicaleService],
})
export class FicheMedicaleModule {}
