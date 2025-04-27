import { Entity, OneToMany } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Animal } from '../../animal/entities/animal.entity';
@Entity('pet_owner')
export class ProprietaireAnimal extends Utilisateur {
  @OneToMany(() => Animal, (animal) => animal.proprietaire)
  animaux: Animal[];
}
