import { Module } from '@nestjs/common';
import { FicheMedicaleService } from './fiche-medicale.service';
import { FicheMedicaleController } from './fiche-medicale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FicheMedicale } from './entities/fiche-medicale.entity';

@Module({
  controllers: [FicheMedicaleController],
  providers: [FicheMedicaleService],
})
export class FicheMedicaleModule {}
