import { ChildEntity } from 'typeorm';
import { Utilisateur } from './utilisateur.entity';

@ChildEntity('admin')
export class Administrateur extends Utilisateur {
}