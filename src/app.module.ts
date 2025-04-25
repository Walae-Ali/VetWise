import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { AnimalModule } from './animal/animal.module';
import { FicheMedicaleModule } from './fiche-medicale/fiche-medicale.module';
import { CliniqueModule } from './clinique/clinique.module';
import { DossierMedicalModule } from './dossier-medical/dossier-medical.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinique } from './clinique/entities/clinique.entity';
import { FicheMedicale } from './fiche-medicale/entities/fiche-medicale.entity';
import { DossierMedical } from './dossier-medical/entities/dossier-medical.entity';
import { Animal } from './animal/entities/animal.entity';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { Administrateur } from './utilisateur/entities/administrateur.entity';
import { Veterinaire } from './utilisateur/entities/veterinaire.entity';
console.log('DB_USERNAME:', process.env.DB_USERNAME);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql', 
        host: config.get('DB_HOST'),
        port: +config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, 
      }),
    }),
    
    UtilisateurModule, AnimalModule, FicheMedicaleModule, CliniqueModule, DossierMedicalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
