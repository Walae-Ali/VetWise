import { DossierMedical } from 'src/dossier-medical/entities/dossier-medical.entity';
import { Veterinaire } from 'src/utilisateur/entities/veterinaire.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';


@Entity('fiche_medicale')
export class FicheMedicale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  diagnostic: string;

  @Column()
  traitement: string;

  @Column({ nullable: true })
  notes: string;
  @ManyToOne(()=>DossierMedical,(dossier)=>dossier.fichesMedicales)
  dossier:DossierMedical;

  @ManyToOne(() => Veterinaire)
  @JoinColumn({ name: 'veterinaireId' })
  veterinaire: Veterinaire;
}
