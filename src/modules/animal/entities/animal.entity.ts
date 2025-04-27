import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { ProprietaireAnimal } from '../../utilisateur/entities/proprietaire-animal.entity';
import { FicheMedicale } from '../../fiche-medicale/entities/fiche-medicale.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  espece: string;

  @Column()
  race: string;

  @Column({ type: 'date' })
  dateNaissance: Date;

  @Column()
  sexe: string;

  @Column('float')
  poids: number;

  @Column()
  etatSante: string;

  @ManyToOne(() => ProprietaireAnimal, (proprietaire) => proprietaire.animaux)
  proprietaire: ProprietaireAnimal;
}
