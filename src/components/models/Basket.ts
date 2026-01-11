import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class Basket {
  protected products: IProduct[] = [];
  protected events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  getProducts(): IProduct[] {
    return this.products// - получение массива товаров, которые находятся в корзине; 
  }

  addProduct(product: IProduct): void {
    this.products.push(product);  // - добавление товара, который был получен в параметре, в массив корзины;
    this.events.emit('basket:change');
  }

  removeProduct(product: IProduct): void {
    this.products = this.products.filter(elem => elem.id !== product.id); // - удаление товара, полученного в параметре из массива корзины;
    this.events.emit('basket:change')
  }
  
  clear(): void {
    this.products = []; // - очистка корзины;
    this.events.emit('basket:change')
  } 

  getTotalPrice(): number {
    return this.products.reduce((total, item) => total + (item.price || 0), 0) // - Общая сумма всех товаров
  }

  getCount(): number {
    if(this.products.length === 0) {
      return 0;
    } else {
      return this.products.length; // - получение количества товаров в корзине;
    }
  }
  
  checkProductByID(id: string): boolean {
    return this.products.some(elem => elem.id === id) // - проверка наличия товара в корзине по его id, полученного в параметр метода.
  } 
  }