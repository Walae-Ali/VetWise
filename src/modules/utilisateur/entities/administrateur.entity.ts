import { Entity } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@Entity('admin')
export class Administrateur extends Utilisateur {}
