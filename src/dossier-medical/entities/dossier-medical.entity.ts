import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Animal } from 'src/animal/entities/animal.entity';
import { FicheMedicale } from 'src/fiche-medicale/entities/fiche-medicale.entity';

@Entity('dossier_medical')
export class DossierMedical {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Animal, (animal) => animal.dossierMedical)
  @JoinColumn()
  animal: Animal;

  @OneToMany(() => FicheMedicale, (fiche) => fiche.dossier,{ cascade: true })
  fichesMedicales: FicheMedicale[];
}
