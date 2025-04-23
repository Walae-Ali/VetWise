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
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';

@Controller('utilisateurs')
export class UtilisateurController {
  constructor(private readonly utilisateurService: UtilisateurService) {}

  // GET /utilisateurs/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.utilisateurService.findById(id);
  }

  // PATCH /utilisateurs/:id
  @Patch(':id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateUtilisateurDto,
  ) {
    return this.utilisateurService.updateProfile(id, updateDto);
  }

  // DELETE /utilisateurs/:id
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.utilisateurService.deleteUser(id);
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
