import { IsInt } from 'class-validator';

export class CreateDossierMedicalDto {
  @IsInt()
  animalId: number;
}
