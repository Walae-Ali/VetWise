import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { UtilisateurService } from './utilisateur.service';

@Controller('utilisateurs')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}
}
