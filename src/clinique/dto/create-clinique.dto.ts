import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCliniqueDto {
  @IsNotEmpty()
  nom: string;

  @IsNotEmpty()
  adresse: string;

  @IsNotEmpty()
  telephone: string;

  @IsNotEmpty()
  horairesOuverture: string;

  @IsOptional()
  @IsString()
  coordonneesGPS?: string;
}
