import { IProduct } from './../../types/index';

export class Catalog {
  protected products: IProduct[] = [];
  protected selectedProduct: IProduct | null = null; 

  constructor () {
  }

  setProducts(products: IProduct[]) {
    this.products = products // сохраняем в поле класса products - массив карточек, полученных от сервера.
  }

  getProducts(): IProduct[] {
    return this.products // - получение массива товаров из модели
  }

  getProductById(id: string): IProduct | null {
    const item = this.products.find(elem => elem.id === id) // - получение одного товара по его id;
      if (!item) {
        throw new Error(`Product ${id} not found`);
      }
    return item;
  }
  
  setProduct(id: string):void {
    this.selectedProduct = this.getProductById(id); // - сохранение товара для подробного отображения;
  } 

  getProduct(): IProduct | null {
    return this.selectedProduct // - получение товара для подробного отображения;
  }
}

