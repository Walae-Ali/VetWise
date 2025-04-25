// utilisateur.entity.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    TableInheritance,
    ChildEntity,
    OneToMany,
  } from 'typeorm';
  
  @Entity()
  @TableInheritance({ column: { type: 'varchar', name: 'type' } })
  export class Utilisateur {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    nom: string;
  
    @Column()
    prenom: string;
  
    @Column({ unique: true })
    email: string;
  
    @Column()
    motDePasse: string;
  
    @Column({ nullable: true })
    telephone: string;
  
    @Column({ nullable: true })
    adresse: string;
  
    @Column({ default: false })
    estVerifie: boolean;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dateInscription: Date;
  }
  