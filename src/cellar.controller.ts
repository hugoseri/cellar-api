import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CellarService } from './cellar.service';
import { Cellar } from './Cellar';
import { Bottle } from './Bottle';

interface cellarDTO {
  name: string;
}

interface bottleDTO {
  name: string;
  price: number;
}

interface simpleCellar {
  name: string;
  id: string;
}

@Controller('cellars')
export class CellarController {
  constructor(private readonly cellarService: CellarService) {
  }

  @Get()
  async getAllCellars(): Promise<Cellar[]> {
    let allCellars = await this.cellarService.getAllCellars();
    return allCellars;
  }

  @Get(':id')
  async getCellarById(@Param('id') id:string): Promise<Cellar> {
    let cellar = await this.cellarService.getCellarById(id);
    return cellar;
  }

  @Post()
  async CreateCellar(@Body() cellarName: cellarDTO): Promise<simpleCellar> {
    let cellar = await this.cellarService.createCellar(cellarName.name);
    return cellar;
  }

  @Post(':id/bottles')
  async CreateBottle(@Param('id') id: string, @Body() bottle: bottleDTO): Promise<bottleDTO> {
    let bottleCreated = await this.cellarService.createBottle(id, bottle.name, bottle.price);
    return bottleCreated;
  }

  @Get(':id/bottles')
  async getAllBottles(@Param('id') id:string): Promise<Bottle[]> {
    let allBottles = await this.cellarService.getAllBottlesFromCellarId(id);
    return allBottles;
  }
}
