import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
