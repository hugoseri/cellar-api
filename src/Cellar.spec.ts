import {Cellar} from './Cellar';

describe('Cellar', () => {
  let cellar: Cellar;

  beforeEach(() => {
    cellar = new Cellar('Test cellar', "1");
  });

  it('should set a proper Cellar object', () => {
    expect(cellar.name).toBeDefined();
    expect(cellar.nbBottles).toBeDefined();
    expect(cellar.bottles).toBeDefined();
    expect(cellar.id).toBeDefined();
  });

  it('should add a bottle in a cellar', () => {
    //Arrange
    const bottleName = "Sauvignon";
    const bottlePrice = 15;
    cellar.addBottle(bottleName, bottlePrice);

    //Act
    const testBottle = cellar.getBottle(bottleName);
    const testAllBottles = cellar.getAllBottles();

    //Assert
    expect(testBottle).toEqual({
      name: bottleName,
      price: bottlePrice,
    });
    expect(testAllBottles).toEqual([
      {
        name: bottleName,
        price: bottlePrice,
      }
    ]);
  });

  it('should get an error when getting unexisting bottle', () =>{
    //Arrange
    const bottleName = "Sauvignon";
    const bottlePrice = 15;
    cellar.addBottle(bottleName, bottlePrice);

    expect(() => cellar.getBottle("Sauvignard")).toThrowError();
  });

  describe('getTotalPrice', () => {
    let bottlePrice1;
    let bottlePrice2;

    beforeEach(() => {
      bottlePrice1 = 15;
      cellar.addBottle("Sauvignon", bottlePrice1);
      bottlePrice2 = 18;
      cellar.addBottle("Montbazillac", bottlePrice2);
    })

    it("should get total price of the cellar in euro", () => {
      const totalPriceEuro = cellar.getTotalPrice().toEuro();
      expect(totalPriceEuro).toEqual(bottlePrice1 + bottlePrice2);
    });
    it("should get total price of the cellar in dollar", () => {
      const totalPriceEuro = cellar.getTotalPrice().toDollar();
      expect(totalPriceEuro).toEqual((bottlePrice1 + bottlePrice2)*0.8);
    });
  });
});
