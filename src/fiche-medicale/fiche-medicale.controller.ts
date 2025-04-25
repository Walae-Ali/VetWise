import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FicheMedicaleService } from './fiche-medicale.service';
import { CreateFicheMedicaleDto } from './dto/create-fiche-medicale.dto';
import { UpdateFicheMedicaleDto } from './dto/update-fiche-medicale.dto';

@Controller('fiche-medicale')
export class FicheMedicaleController {
  constructor(private readonly ficheMedicaleService: FicheMedicaleService) {}

  @Post()
  create(@Body() createFicheMedicaleDto: CreateFicheMedicaleDto) {
    return this.ficheMedicaleService.create(createFicheMedicaleDto);
  }

  @Get()
  findAll() {
    return this.ficheMedicaleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ficheMedicaleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFicheMedicaleDto: UpdateFicheMedicaleDto) {
    return this.ficheMedicaleService.update(+id, updateFicheMedicaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ficheMedicaleService.remove(+id);
  }
}
