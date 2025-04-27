// clinique.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Veterinaire } from '../../utilisateur/entities/veterinaire.entity';

@Entity()
export class Clinique {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  adresse: string;

  @Column()
  telephone: string;

  @Column()
  horairesOuverture: string;

  @Column({ nullable: true })
  coordonneesGPS: string;

  @OneToMany(() => Veterinaire, (vet) => vet.clinique)
  veterinaires: Veterinaire[];
}
