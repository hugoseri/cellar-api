import { Bottle } from './Bottle';

interface TotalPrice {
  toEuro: () => number;
  toDollar: () => number;
}

export class Cellar {

  bottles: Bottle[] = [];
  nbBottles: number;
  name: string;
  id: string;

  constructor(name: string, id:string) {
    this.nbBottles = 0;
    this.name = name;
    this.id = id;
  }

  getId(): string{
    return this.id;
  }

  addBottle(name: string, price: number): void {
    const myBottle = new Bottle(name, price);
    this.bottles.push(myBottle);
    this.nbBottles++;
  }

  getBottle(name: string): Bottle {

    let i: number = 0;
    let found: boolean = false;
    let myBottle = new Bottle('empty', 0);

    while (i < this.nbBottles && !found) {
      if (this.bottles[i].name === name) {
        found = true;
        myBottle = this.bottles[i];
      }
      i++;
    }
    if (found) {
      return myBottle;
    } else {
      throw new Error(`The bottle named ${name} isn't in the cellar.`);
    }
  }

  getAllBottles(){
    return this.bottles;
  }

  getTotalPrice(): TotalPrice {
    return {
      toEuro: () => {
        return this.computeTotalPrice();
      },
      toDollar: () => {
        return this.computeTotalPrice() * 0.8;
      },
    };
  }

  computeTotalPrice(): number {
    let price = 0;
    for (let i = 0; i < this.nbBottles; i++) {
      price += this.bottles[i].price;
    }
    return price;
  }
}
