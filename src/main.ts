import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { WebLarekApi } from './components/models/WebLarekApi';
import './scss/styles.scss';
import { apiProducts } from './utils/data';

const productsModels = new Catalog(apiProducts.items);
productsModels.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', productsModels.getProducts())
console.log('Получение одного товара по его id:', productsModels.getProductById(apiProducts.items[2].id));
productsModels.setProduct(apiProducts.items[0].id) // - Cохранение товара для подробного отображения
console.log('Получение товара для подробного отображения:', productsModels.getProduct())

const productInBasket = new Basket(apiProducts.items);
console.log('Массив товаров из корзины(каталога):', productInBasket.getProducts());
productInBasket.addProduct({
  "id": "c10gfgd-345345treg5-5345g6g353",
  "description": "mme.",
  "image": "/Shell.svg",
  "title": "f;f",
  "category": "прочее",
  "price": 100000
})
console.log('Стоимость корзины:', productInBasket.getPrice())
console.log('Проверка наличия товара по ID:', productInBasket.checkProductByID('b06cde61-912f-4663-9751-09956c0eed67'))
console.log('Получение кол-ва товаров:', productInBasket.getCount())
console.log('Добавление товара, который был получен в параметре, в массив корзины:', productInBasket.getProducts());
productInBasket.removeProduct({
  "id": "b06cde61-912f-4663-9751-09956c0eed67",
  "description": "Будет стоять над душой и не давать прокрастинировать.",
  "image": "/Asterisk_2.svg",
  "title": "Мамка-таймер",
  "category": "софт-скил",
  "price": null
})
console.log('Удаление товара, полученного в параметре из массива корзины:', productInBasket.getProducts());
productInBasket.clear()
console.log('Очистка корзины:', productInBasket.getProducts())
console.log('Стоимость корзины:', productInBasket.getPrice())
console.log('Кол-во товаров:', productInBasket.getCount())
console.log('Проверка наличия товара по ID:', productInBasket.checkProductByID('b06cde61-912f-4663-9751-09956c0eed67'))

const buyer = new Buyer('card', 'Zhukovskya 18 dom 3 kv 5', '+79964319345', 'shlepa@gmail.com');

buyer.address = 'Prospekt Vernadskogo 8-17'
buyer.payment = 'cash'
buyer.email = 'nyusha@gmail.ru'
buyer.phone = '+74952589576'
console.log('Все данные покупателя:', buyer.getData())
buyer.clearData();
console.log('Все данные покупателя:', buyer.getData())
console.log('Проверка валидации:', buyer.isValid('', '', '', ''))

const api = new WebLarekApi (apiProducts, 'http://localhost:3000/api/weblarek')
console.log(api)