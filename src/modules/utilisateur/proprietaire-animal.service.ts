import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Repository } from 'typeorm';
import { ProprietaireAnimal } from './entities/proprietaire-animal.entity';
@Injectable()
export class PetOwnerService extends GenericService<ProprietaireAnimal> {
  constructor(
    @InjectRepository(ProprietaireAnimal)
    private readonly proprietaireAnimalRepository: Repository<ProprietaireAnimal>,
  ) {
    super(proprietaireAnimalRepository);
  }
}
