import { Api } from './components/base/Api';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { WebLarekApi } from './components/models/WebLarekApi';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';


const productsModels = new Catalog();
productsModels.setProducts(apiProducts.items);
console.log('Массив товаров из каталога:', productsModels.getProducts())
console.log('Получение одного товара по его id:', productsModels.getProductById(apiProducts.items[2].id));
productsModels.setProduct(apiProducts.items[0].id) // - Cохранение товара для подробного отображения
console.log('Получение товара для подробного отображения:', productsModels.getProduct())

const productInBasket = new Basket();
console.log('Массив товаров из корзины(каталога):', productInBasket.getProducts());
productInBasket.addProduct({
  "id": "c10gfgd-345345treg5-5345g6g353",
  "description": "mme.",
  "image": "/Shell.svg",
  "title": "f;f",
  "category": "прочее",
  "price": 100000
})
console.log('Стоимость корзины:', productInBasket.getTotalPrice())
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
console.log('Стоимость корзины:', productInBasket.getTotalPrice())
console.log('Кол-во товаров:', productInBasket.getCount())
console.log('Проверка наличия товара по ID:', productInBasket.checkProductByID('b06cde61-912f-4663-9751-09956c0eed67'))

const buyer = new Buyer();

buyer.setPayment('cash');
buyer.setAddress('st Walking dom 8');
buyer.setPhone('89964447799');
buyer.setEmail('nyusha@gmail.com');

const dataBuyer = buyer.getData();
console.log(dataBuyer)

const checkValidation = buyer.isValid();
console.log(checkValidation);

const baseApi = new Api(API_URL);
const api = new WebLarekApi(baseApi);

api.getProducts()
.then((res)=> {
  const newData = res.items
  productsModels.setProducts(newData)
  console.log(productsModels.getProducts())
})
.catch((err)=> {console.log('Ошибка получения данных', err)})
