import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { UserRole } from '../../../common/enums/roles.enum';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  @IsNotEmpty()
  prenom: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  motDePasse: string;

  @IsString()
  role: UserRole;

  @IsString()
  @IsOptional()
  telephone?: string;

  @IsString()
  @IsOptional()
  adresse?: string;

  @IsOptional()
  @ValidateIf((o) => o.role === UserRole.PET_OWNER)
  petTypePreference?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.role === UserRole.VETERINARIAN)
  specialization?: string;

  @IsString()
  @IsOptional()
  @ValidateIf((o) => o.role === UserRole.VETERINARIAN)
  numLicence?: string;
}
