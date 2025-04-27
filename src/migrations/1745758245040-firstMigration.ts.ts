import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstMigration_ts1745758245040 implements MigrationInterface {
  name = 'FirstMigration.ts1745758245040';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`utilisateur\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`nom\` varchar(255) NOT NULL, \`prenom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`motDePasse\` varchar(255) NOT NULL, \`role\` enum ('ADMINISTRATEUR', 'PROPRIETAIRE_ANIMAL', 'VETERINAIRE') NOT NULL, \`telephone\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`estVerifie\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`twoFactorSecret\` varchar(255) NULL, \`lastLogin\` datetime NULL, \`verificationToken\` varchar(255) NULL, \`verificationExpires\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_e1136325a6b28e2a02b81b2f5e\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`clinique\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`adresse\` varchar(255) NOT NULL, \`telephone\` varchar(255) NOT NULL, \`horairesOuverture\` varchar(255) NOT NULL, \`coordonneesGPS\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`veterinaire\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`nom\` varchar(255) NOT NULL, \`prenom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`motDePasse\` varchar(255) NOT NULL, \`role\` enum ('ADMINISTRATEUR', 'PROPRIETAIRE_ANIMAL', 'VETERINAIRE') NOT NULL, \`telephone\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`estVerifie\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`twoFactorSecret\` varchar(255) NULL, \`lastLogin\` datetime NULL, \`verificationToken\` varchar(255) NULL, \`verificationExpires\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`numLicence\` varchar(255) NOT NULL, \`specialites\` varchar(255) NOT NULL, \`cliniqueId\` int NULL, UNIQUE INDEX \`IDX_18b69c94ff2870ba1ca397ff1c\` (\`email\`), UNIQUE INDEX \`IDX_91bf533ab6a73933b600a852de\` (\`numLicence\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`animal\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nom\` varchar(255) NOT NULL, \`espece\` varchar(255) NOT NULL, \`race\` varchar(255) NOT NULL, \`dateNaissance\` date NOT NULL, \`sexe\` varchar(255) NOT NULL, \`poids\` float NOT NULL, \`etatSante\` varchar(255) NOT NULL, \`proprietaireId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`pet_owner\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`nom\` varchar(255) NOT NULL, \`prenom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`motDePasse\` varchar(255) NOT NULL, \`role\` enum ('ADMINISTRATEUR', 'PROPRIETAIRE_ANIMAL', 'VETERINAIRE') NOT NULL, \`telephone\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`estVerifie\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`twoFactorSecret\` varchar(255) NULL, \`lastLogin\` datetime NULL, \`verificationToken\` varchar(255) NULL, \`verificationExpires\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_34b7bd7a5f59e94d01b0feab06\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`nom\` varchar(255) NOT NULL, \`prenom\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`motDePasse\` varchar(255) NOT NULL, \`role\` enum ('ADMINISTRATEUR', 'PROPRIETAIRE_ANIMAL', 'VETERINAIRE') NOT NULL, \`telephone\` varchar(255) NULL, \`adresse\` varchar(255) NULL, \`estVerifie\` tinyint NOT NULL DEFAULT 0, \`twoFactorEnabled\` tinyint NOT NULL DEFAULT 0, \`twoFactorSecret\` varchar(255) NULL, \`lastLogin\` datetime NULL, \`verificationToken\` varchar(255) NULL, \`verificationExpires\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX \`IDX_de87485f6489f5d0995f584195\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`fiche_medicale\` (\`id\` int NOT NULL AUTO_INCREMENT, \`date\` varchar(255) NOT NULL, \`diagnostic\` varchar(255) NOT NULL, \`traitement\` varchar(255) NOT NULL, \`notes\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`veterinaire\` ADD CONSTRAINT \`FK_b03d7b6330cc0a1b641fb63522d\` FOREIGN KEY (\`cliniqueId\`) REFERENCES \`clinique\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`animal\` ADD CONSTRAINT \`FK_ea0cfb88c0ae9531a44fedb98c4\` FOREIGN KEY (\`proprietaireId\`) REFERENCES \`pet_owner\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`animal\` DROP FOREIGN KEY \`FK_ea0cfb88c0ae9531a44fedb98c4\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`veterinaire\` DROP FOREIGN KEY \`FK_b03d7b6330cc0a1b641fb63522d\``,
    );
    await queryRunner.query(`DROP TABLE \`fiche_medicale\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_de87485f6489f5d0995f584195\` ON \`admin\``,
    );
    await queryRunner.query(`DROP TABLE \`admin\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_34b7bd7a5f59e94d01b0feab06\` ON \`pet_owner\``,
    );
    await queryRunner.query(`DROP TABLE \`pet_owner\``);
    await queryRunner.query(`DROP TABLE \`animal\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_91bf533ab6a73933b600a852de\` ON \`veterinaire\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_18b69c94ff2870ba1ca397ff1c\` ON \`veterinaire\``,
    );
    await queryRunner.query(`DROP TABLE \`veterinaire\``);
    await queryRunner.query(`DROP TABLE \`clinique\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e1136325a6b28e2a02b81b2f5e\` ON \`utilisateur\``,
    );
    await queryRunner.query(`DROP TABLE \`utilisateur\``);
  }
}
