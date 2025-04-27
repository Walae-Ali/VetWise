import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateFicheMedicaleDto {
    @IsString()
    diagnostic: string;
  
    @IsString()
    traitement: string;
  
    @IsOptional()
    @IsString()
    notes?: string;
  
    @IsInt()
    dossierId: number;
  
    @IsInt()
    veterinaireId: number;
  }
  