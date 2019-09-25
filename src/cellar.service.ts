import { Injectable } from '@nestjs/common';
import { Cellar } from './Cellar';
import { sequenceEqual } from 'rxjs/operators';

@Injectable()
export class CellarService {

  currentId: number = 1;
  allCellars: Cellar[] = [new Cellar("Demo Cellar", this.currentId.toString())];

  getAllCellars(): Promise<Cellar[]> {
    return Promise.resolve(this.allCellars);
  }

  getCellarById(id: string): Promise<Cellar> {
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
      return Promise.resolve(cellarWanted);
    } else {
      throw Error(`The cellar of id = ${id} doesn't exist.`);
    }
  }

  createCellar(cellarName: string){
    this.currentId ++;
    let id = this.currentId;
    let myCellar = new Cellar(cellarName, id.toString());
    this.allCellars.push(myCellar);

    return Promise.resolve({name:cellarName, id:id.toString()});
  }

  createBottle(id: string, bottleName: string, bottleprice: number) {
    this.getCellarById(id)
      .then(cellar => cellar.addBottle(bottleName, bottleprice))
    return Promise.resolve({name: bottleName, price: bottleprice})
  }

  getAllBottlesFromCellarId(id: string){
    let output = this.getCellarById(id)
      .then(cellar => cellar.getAllBottles());
    return Promise.resolve(output);
  }
}
