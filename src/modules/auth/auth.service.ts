// src/modules/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as speakeasy from 'speakeasy';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Utilisateur } from '../utilisateur/entities/utilisateur.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private config: any;
  constructor(
    private usersService: UtilisateurService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    this.config = this.configService.get('jwt');
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Compte désactivé');
    }

    const isPasswordValid = await bcrypt.compare(password, user.motDePasse);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants incorrects');
    }

    const { motDePasse, twoFactorSecret, ...result } = user;
    return result;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);

    // Check if 2FA is required and there is no code
    if (user.twoFactorEnabled && !loginDto.twoFactorCode) {
      return {
        requireTwoFactor: true,
        userId: user.id,
      };
    }

    // Verify 2FA if enabled and code provided
    if (user.twoFactorEnabled && loginDto.twoFactorCode) {
      const isCodeValid = this.verifyTwoFactorCode(
        user.id,
        loginDto.twoFactorCode,
      );
      if (!isCodeValid) {
        throw new UnauthorizedException(
          "Code d'authentification à deux facteurs invalide",
        );
      }
    }

    // Update last login time
    await this.usersService.updateLastLogin(user.id);

    return this.generateTokens(user);
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.createUser(registerDto);
  }

  private generateTokens(user: Partial<Utilisateur>) {
    //payload is the data to be encoded in the JWT token
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.config.signOptions.expiresIn,
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.config.refreshToken.expiresIn,
      }),
      user: {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        estVerifie: user.estVerifie,
      },
    };
  }
  //issues new tokens using the refresh token
  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);

      if (!user || !user.isActive) {
        throw new UnauthorizedException();
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Jeton de rafraîchissement invalide');
    }
  }

  async setupTwoFactor(userId: number) {
    //name hia el value elli to
    const secret = speakeasy.generateSecret({
      name: 'VetMed Application',
    });

    await this.usersService.setTwoFactorSecret(userId, secret.base32);

    return {
      secret: secret.base32,
      otpauth_url: secret.otpauth_url,
    };
  }

  verifyTwoFactorCode(userId: number, code: string): boolean {
    const user = this.usersService.findOne(userId);

    if (!user || !user['twoFactorSecret']) {
      return false;
    }

    return speakeasy.totp.verify({
      secret: user['twoFactorSecret'],
      encoding: 'base32',
      token: code,
    });
  }

  async enableTwoFactor(userId: number): Promise<void> {
    await this.usersService.updateTwoFactor(userId, true);
  }

  async disableTwoFactor(userId: number): Promise<void> {
    await this.usersService.updateTwoFactor(userId, false);
  }
}
