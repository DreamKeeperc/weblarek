import { IProduct } from './../../types/index';

export class Catalog {
  protected _products: IProduct[];
  protected _product!: IProduct | undefined; 

  constructor (products: IProduct[]) {
    this._products = products;
    
  }

  setProducts(products: IProduct[]) {
    this._products = products // сохраняем в поле класса _products - массив карточек, полученных от сервера.
  }

  getProducts(): IProduct[] {
    return this._products // - получение массива товаров из модели
  }

  getProductById(id: string): IProduct | undefined {
    const item = this._products.find(elem => elem.id === id) // - получение одного товара по его id;
      if (!item) {
        throw new Error(`Product ${id} not found`);
      }
    return item;
  }
  
  setProduct(id: string):void {
    this._product = this.getProductById(id); // - сохранение товара для подробного отображения;
  } 

  getProduct(): IProduct | undefined {
    return this._product // - получение товара для подробного отображения;
  }
}

