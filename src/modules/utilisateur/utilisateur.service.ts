import {
  ConflictException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Utilisateur } from './entities/utilisateur.entity';
import * as bcrypt from 'bcrypt';
import { GenericService } from '../../common/services/generic.service';
import { RegisterDto } from '../auth/dto/register.dto';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service';
import { UserRole } from '../../common/enums/roles.enum';
import { ProprietaireAnimal } from './entities/proprietaire-animal.entity';
import { Veterinaire } from './entities/veterinaire.entity';
@Injectable()
export class UtilisateurService extends GenericService<Utilisateur> {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly UtilisateurRepository: Repository<Utilisateur>,
    private readonly dataSource: DataSource,
    private readonly mailService: MailService,
  ) {
    super(UtilisateurRepository);
  }
  async findByEmail(email: string): Promise<Utilisateur | null> {
    return await this.UtilisateurRepository.findOne({ where: { email } });
  }

  // User service method to create a user with email verification
  async createUser(
    createUserDto: RegisterDto,
  ): Promise<Omit<Utilisateur, 'motDePasse' | 'twoFactorSecret'>> {
    return this.dataSource.transaction(async (manager) => {
      const existingUser = await manager.findOne(Utilisateur, {
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('Email already registered !');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createUserDto.motDePasse,
        saltRounds,
      );

      // 3. Generate verification token
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const verificationExpires = new Date();
      verificationExpires.setHours(verificationExpires.getHours() + 24); // 24 hour expiry

      // Check the role and create the appropriate entity
      let newUser: Utilisateur;
      if (createUserDto.role === UserRole.PET_OWNER) {
        newUser = manager.create(ProprietaireAnimal, {
          email: createUserDto.email,
          prenom: createUserDto.prenom,
          nom: createUserDto.nom,
          motDePasse: hashedPassword,
          role: UserRole.PET_OWNER,
          telephone: createUserDto.telephone,
          adresse: createUserDto.adresse,
        });
      } else if (createUserDto.role === UserRole.VETERINARIAN) {
        newUser = manager.create(Veterinaire, {
          email: createUserDto.email,
          prenom: createUserDto.prenom,
          nom: createUserDto.nom,
          motDePasse: hashedPassword,
          role: UserRole.VETERINARIAN,
          telephone: createUserDto.telephone,
          adresse: createUserDto.adresse,
          numLicence: createUserDto.numLicence,
          specialites: createUserDto.specialization,
        });
      } else {
        throw new BadRequestException('Invalid role provided!');
      }

      // Save the new user entity
      await manager.save(newUser);

      // 6. Send verification email
      await this.mailService.sendVerificationEmail(
        newUser.email,
        newUser.prenom,
        verificationToken,
      );

      await this.createVerificationToken(
        newUser,
        verificationToken,
        verificationExpires,
      );

      // 7. Return newUser without sensitive fields
      const { motDePasse, twoFactorSecret, ...result } = newUser;
      return result;
    });
  }

  // Email verification method
  async verifyEmail(
    token: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.UtilisateurRepository.findOne({
      where: { verificationToken: token },
    }); // we are verifying the existence of the token here

    if (!user) {
      throw new NotFoundException('Invalid verification token');
    }

    if (user.estVerifie) {
      return { success: true, message: 'Email already verified' };
    }

    if (user.verificationExpires && user.verificationExpires < new Date()) {
      throw new BadRequestException('Verification token has expired');
    }

    // Update user as verified
    user.estVerifie = true;
    user.verificationToken = null;
    user.verificationExpires = null;

    await this.UtilisateurRepository.save(user);

    return { success: true, message: 'Email successfully verified' };
  }
  async setTwoFactorSecret(userId: number, code: string): Promise<void> {
    const user = await this.UtilisateurRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.UtilisateurRepository.update(userId, { twoFactorSecret: code });
  }

  async updateTwoFactor(userId: number, isEnabled: boolean): Promise<void> {
    const user = await this.UtilisateurRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.UtilisateurRepository.update(userId, {
      twoFactorEnabled: isEnabled,
    });
  }

  async updateLastLogin(userId: number): Promise<void> {
    const user = await this.UtilisateurRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.UtilisateurRepository.update(userId, { lastLogin: new Date() });
  }

  private async createVerificationToken(
    user: Utilisateur,
    token: string,
    expires: Date,
  ): Promise<void> {
    await this.UtilisateurRepository.update(user.id, {
      verificationToken: token,
      verificationExpires: expires,
    });
  }
}
