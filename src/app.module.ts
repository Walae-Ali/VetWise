import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './modules/utilisateur/utilisateur.module';
import { AnimalModule } from './modules/animal/animal.module';
import { FicheMedicaleModule } from './modules/fiche-medicale/fiche-medicale.module';
import { CliniqueModule } from './modules/clinique/clinique.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinique } from './modules/clinique/entities/clinique.entity';
import { FicheMedicale } from './modules/fiche-medicale/entities/fiche-medicale.entity';
import { Animal } from './modules/animal/entities/animal.entity';
import { Utilisateur } from './modules/utilisateur/entities/utilisateur.entity';
import { Administrateur } from './modules/utilisateur/entities/administrateur.entity';
import { Veterinaire } from './modules/utilisateur/entities/veterinaire.entity';
import { AuthModule } from './modules/auth/auth.module';
import { MailModule } from './modules/mail/mail.module';
import {
  AppDataSource,
  databaseConfig,
  jwtConfig,
  mailConfig,
} from './config/configuration';
//import { AppDataSource } from './config/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, mailConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...AppDataSource.options,
      }),
    }),
    UtilisateurModule,
    AnimalModule,
    FicheMedicaleModule,
    CliniqueModule,
    AuthModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
