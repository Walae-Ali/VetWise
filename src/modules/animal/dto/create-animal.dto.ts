import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateAnimalDto {
  @IsString()
  nom: string;

  @IsString()
  espece: string;

  @IsString()
  race: string;

  @IsDateString()
  dateNaissance: Date;

  @IsString()
  sexe: string;

  @IsNumber()
  poids: number;

  @IsString()
  etatSante: string;

  @IsNumber()
  proprietaireId: number;
}
