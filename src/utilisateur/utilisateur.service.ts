import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  // Récupérer tous les utilisateurs
  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  // Récupérer un utilisateur par ID
  async findById(id: number): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne({ where: { id } });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');
    return utilisateur;
  }

  // Récupérer un utilisateur par email
  async findByEmail(email: string): Promise<Utilisateur | null> {
    return this.utilisateurRepository.findOne({ where: { email } });
  }

  // Mise à jour du profil
  async updateProfile(id: number, updateDto: UpdateUtilisateurDto): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.preload({
      id,
      ...updateDto,
    });
    if (!utilisateur) throw new NotFoundException('Utilisateur non trouvé');
    return this.utilisateurRepository.save(utilisateur);
  }

  // Suppression d'un utilisateur
  async deleteUser(id: number): Promise<void> {
    const result = await this.utilisateurRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Utilisateur non trouvé');
    }
  }

  // Recherche par nom ou email
  async search(term: string): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find({
      where: [
        { nom: term },
        { email: term },
      ],
    });
  }
}
