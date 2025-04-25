
import { ChildEntity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';
import { Clinique } from 'src/clinique/entities/clinique.entity';


@ChildEntity('veterinaire')
export class Veterinaire extends Utilisateur {
  @Column()
  numLicence: string;

  @Column({ nullable: true })
  specialites: string;

  @Column({ nullable: true })
  horairesTravail: string;


   @ManyToOne(() => Clinique, clinique => clinique.veterinaires)
   clinique: Clinique;

//   @OneToMany(() => RendezVous, rdv => rdv.veterinaire)
//   rendezVous: RendezVous[];
}
