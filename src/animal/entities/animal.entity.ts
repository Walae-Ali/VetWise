import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ProprietaireAnimal } from 'src/utilisateur/entities/proprietaire-animal.entity';
import { FicheMedicale } from 'src/fiche-medicale/entities/fiche-medicale.entity';
import { DossierMedical } from 'src/dossier-medical/entities/dossier-medical.entity';

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

  @ManyToOne(() => ProprietaireAnimal, (proprio) => proprio.animaux, { eager: true })
  proprietaire: ProprietaireAnimal;
  @OneToOne(() => DossierMedical, (dossier) => dossier.animal, { cascade: true })
  dossierMedical: DossierMedical;
  
}

