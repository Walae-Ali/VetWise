import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Clinique } from '../../clinique/entities/clinique.entity';
@Entity('veterinaire')
export class Veterinaire extends Utilisateur {
  @Column({ unique: true })
  @Column()
  numLicence: string;

  @Column()
  specialites: string;

  @ManyToOne(() => Clinique, (clinique) => clinique.veterinaires)
  clinique: Clinique;
}
