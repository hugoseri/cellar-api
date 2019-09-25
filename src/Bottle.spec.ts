import {Bottle} from './Bottle';

describe('Bottle', () => {
  let bottle: Bottle;

  beforeEach(() => {
    bottle = new Bottle('Test bottle', 10);
  });

  it('should set a proper Bottle object', () => {
    expect(bottle.price).toBeDefined();
    expect(bottle.name).toBeDefined();
  });

  it('should set a new bottle price', () => {
    //Arrange
    const newPrice = 15;
    bottle.setPrice(newPrice);

    //Act
    const bottlePrice = bottle.price;

    //Assert
    expect(bottlePrice).toEqual(newPrice);
  });
});
