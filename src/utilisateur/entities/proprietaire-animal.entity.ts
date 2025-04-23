import { ChildEntity, OneToMany } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Animal } from 'src/animal/entities/animal.entity';

@ChildEntity('proprietaire')
export class ProprietaireAnimal extends Utilisateur {
  @OneToMany(() => Animal, animal => animal.proprietaire)
   animaux: Animal[];
}