import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CellarService } from './cellar.service';

interface cellarDTO {
  name: string;
}

interface bottleDTO {
  name: string;
  price: number;
}

@Controller('cellars')
export class CellarController {
  constructor(private readonly cellarService: CellarService) {
  }

  @Get()
  getAllCellars() {
    return this.cellarService.getAllCellars();
  }

  @Get(':id')
  getCellarById(@Param('id') id:string){
    return this.cellarService.getCellarById(id);
  }

  @Post()
  CreateCellar(@Body() cellarName: cellarDTO) {
    return this.cellarService.createCellar(cellarName.name);
  }

  @Post(':id/bottles')
  CreateBottle(@Param('id') id: string, @Body() bottle: bottleDTO){
    return this.cellarService.createBottle(id, bottle.name, bottle.price);
  }

  @Get(':id/bottles')
  getAllBottles(@Param('id') id:string){
    return this.cellarService.getAllBottlesFromCellarId(id);
  }
}
