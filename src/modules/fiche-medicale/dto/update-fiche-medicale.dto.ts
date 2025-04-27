
import { IsOptional, IsString } from 'class-validator';

export class UpdateFicheMedicaleDto {
    @IsOptional()
    @IsString()
    diagnostic?: string;
  
    @IsOptional()
    @IsString()
    traitement?: string;
  
    @IsOptional()
    @IsString()
    notes?: string;
  }
  