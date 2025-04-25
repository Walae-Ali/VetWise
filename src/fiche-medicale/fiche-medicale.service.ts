import { Injectable } from '@nestjs/common';
import { CreateFicheMedicaleDto } from './dto/create-fiche-medicale.dto';
import { UpdateFicheMedicaleDto } from './dto/update-fiche-medicale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FicheMedicale } from './entities/fiche-medicale.entity';
import { DossierMedical } from 'src/dossier-medical/entities/dossier-medical.entity';
import { Repository } from 'typeorm';
import { Veterinaire } from 'src/utilisateur/entities/veterinaire.entity';
@Injectable()
export class FicheMedicaleService {
  constructor(
    @InjectRepository(FicheMedicale)
    private ficheRepo: Repository<FicheMedicale>,
    @InjectRepository(DossierMedical)
    private dossierRepo: Repository<DossierMedical>,
    @InjectRepository(Veterinaire)
    private vetRepo: Repository<Veterinaire>,
  ) {}

  async create(dto: CreateFicheMedicaleDto) {
    const dossier = await this.dossierRepo.findOneByOrFail({ id: dto.dossierId });
    const veterinaire = await this.vetRepo.findOneByOrFail({ id: dto.veterinaireId });
    const fiche = this.ficheRepo.create({ ...dto, dossier, veterinaire });
    return this.ficheRepo.save(fiche);
  }

  findAll() {
    return this.ficheRepo.find({ relations: ['dossier', 'veterinaire'] });
  }

  findOne(id: number) {
    return this.ficheRepo.findOne({ where: { id }, relations: ['dossier', 'veterinaire'] });
  }

  update(id: number, dto: UpdateFicheMedicaleDto) {
    return this.ficheRepo.update(id, dto);
  }

  remove(id: number) {
    return this.ficheRepo.delete(id);
  }
}

