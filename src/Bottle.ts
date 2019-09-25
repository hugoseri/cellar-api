export class Bottle {
  name: string = '';
  price: number = 0;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  setPrice(price: number): void {
    this.price = price;
  }
}

interface TotalPrice{
  toEuro: () => number;
  toDollar: () => number;
}
