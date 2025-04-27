import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UtilisateurModule } from '../utilisateur/utilisateur.module'; // Import the module
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'defaultSecret',
      signOptions: { expiresIn: '1h' },
    }),
    UtilisateurModule, // Add the module here
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
