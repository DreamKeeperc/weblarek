import { IProduct } from "../../types";

export class Basket {
  protected _products: IProduct[];

  constructor (products: IProduct[]) {
    this._products = products; 
  }

  getProducts(): IProduct[] {
    return this._products// - получение массива товаров, которые находятся в корзине; 
  }

  addProduct(product: IProduct): void {
    this._products.push(product);  // - добавление товара, который был получен в параметре, в массив корзины;
  }

  removeProduct(product: IProduct): void {
    this._products = this._products.filter(elem => elem.id !== product.id); // - удаление товара, полученного в параметре из массива корзины;
  }
  
  clear(): void {
    while (this._products.length > 0) {
      this._products.pop();  // - очистка корзины;
    }
  } 

  getPrice(): number | null {
    let arrSumOfPrice = this._products.map(elem => elem.price);
    let allPrice: number = 0;
    
    for (let i = 0; i < arrSumOfPrice.length; i++) {
      if (arrSumOfPrice[i] !== null && typeof arrSumOfPrice[i] === 'number') { // - вся стоимость корзины
        allPrice += arrSumOfPrice[i] as number;
      }
    }
    return allPrice;
  }

  getCount(): number | string {
    if(this._products.length <= 0) {
      return 'Корзина пуста'
    } else {
      const count = this._products.length - 1;
      return count; // - получение количества товаров в корзине;
    }
  }
  
  checkProductByID(id: string): boolean {
    return this._products.some(elem => elem.id === id) // - проверка наличия товара в корзине по его id, полученного в параметр метода.
  } 
  }