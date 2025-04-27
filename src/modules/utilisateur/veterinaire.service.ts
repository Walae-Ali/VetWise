import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from '../../common/services/generic.service';
import { Repository } from 'typeorm';
import { Veterinaire } from './entities/veterinaire.entity';
@Injectable()
export class VeterinaireService extends GenericService<Veterinaire> {
  constructor(
    @InjectRepository(Veterinaire)
    private readonly veterinaireRepository: Repository<Veterinaire>,
  ) {
    super(veterinaireRepository);
  }
}
