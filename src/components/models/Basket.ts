import { IProduct } from "../../types";

export class Basket {
  protected products: IProduct[] = [];

  constructor () {
  }

  getProducts(): IProduct[] {
    return this.products// - получение массива товаров, которые находятся в корзине; 
  }

  addProduct(product: IProduct): void {
    this.products.push(product);  // - добавление товара, который был получен в параметре, в массив корзины;
  }

  removeProduct(product: IProduct): void {
    this.products = this.products.filter(elem => elem.id !== product.id); // - удаление товара, полученного в параметре из массива корзины;
  }
  
  clear(): void {
    this.products = []; // - очистка корзины;
  } 

  getTotalPrice(): number | null {
    return this.products.reduce((total, item) => total + (item.price || 0), 0) // - Общая сумма всех товаров
  }

  getCount(): number | string {
    if(this.products.length = 0) {
      return 0;
    } else {
      return this.products.length; // - получение количества товаров в корзине;
    }
  }
  
  checkProductByID(id: string): boolean {
    return this.products.some(elem => elem.id === id) // - проверка наличия товара в корзине по его id, полученного в параметр метода.
  } 
  }