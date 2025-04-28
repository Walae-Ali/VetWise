import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ChildEntity,
} from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Clinique } from '../../clinique/entities/clinique.entity';
import { UserRole } from '../../../common/enums/roles.enum';
@ChildEntity('veterinarian')
export class Veterinaire extends Utilisateur {
  constructor() {
    super();
    this.role = UserRole.VETERINARIAN;
  }

  @Column({ unique: true })
  @Column()
  numLicence: string;

  @Column()
  specialites: string;

  @ManyToOne(() => Clinique, (clinique) => clinique.veterinaires)
  clinique: Clinique;
}
