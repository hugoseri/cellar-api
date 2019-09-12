import { Injectable } from '@nestjs/common';
import { Cellar } from './cellar';
import { sequenceEqual } from 'rxjs/operators';

@Injectable()
export class CellarService {

  currentId: number = 1;
  allCellars: Cellar[] = [new Cellar("Demo Cellar", this.currentId.toString())];

  getAllCellars() {
    return this.allCellars;
  }

  getCellarById(id: string){
    let i = 0;
    let found = false;
    let cellarWanted: Cellar;
    while (i < this.allCellars.length && !found){
      if (this.allCellars[i].getId() === id){
        found = true;
        cellarWanted = this.allCellars[i];
      }
      i++;
    }
    if (found){
      return cellarWanted;
    } else {
      throw Error(`The cellar of id = ${id} doesn't exist.`);
    }
  }

  createCellar(cellarName: string) {
    let id = this.currentId ++;
    let myCellar = new Cellar(cellarName, id.toString());
    this.allCellars.push(myCellar);

    return {name:cellarName, id:id.toString()};
  }

  createBottle(id: string, bottleName: string, bottleprice: number) {
    this.getCellarById(id).addBottle(bottleName, bottleprice);
    return {name: bottleName, price: bottleprice}
  }

  getAllBottlesFromCellarId(id: string){
    return this.getCellarById(id).getAllBottles();
  }
}
