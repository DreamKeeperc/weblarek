import { FormContacts} from './components/view/ContactsForm';
import { CardPreview } from './components/view/CardPreview';
import { Api } from './components/base/Api';
import { EventEmitter } from './components/base/Events';
import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { WebLarekApi } from './components/models/WebLarekApi';
import { CardBasket } from './components/view/CardBasket';
import { CardFull } from './components/view/CardFull';
import { Header } from './components/view/Header';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { Modal } from './components/view/Modal';
import { BasketView } from './components/view/BasketView';
import { SuccessOrder } from './components/view/SuccessOrder';
import { FormOrder } from './components/view/OrderForm';
import { Gallery } from './components/view/Gallery';
import { TPayment } from './types';

const events = new EventEmitter(); // - брокер событий

events.onAll((event) => {
  console.log(event.eventName, event.data);
})

const productsModels = new Catalog(events); // - Классы моделей
const productInBasket = new Basket(events);
const buyer = new Buyer(events);

const baseApi = new Api(API_URL); // - Классы апи
const api = new WebLarekApi(baseApi);

const headerContainer = ensureElement<HTMLElement>('.header'); // - элементы разметки 
const page = ensureElement<HTMLElement>('.page__wrapper');
const modalContainer = ensureElement<HTMLElement>('.modal');

const cardPreviewTemplate = cloneTemplate<HTMLTemplateElement>('#card-preview');
const basketTemplate = cloneTemplate<HTMLTemplateElement>('#basket');
const successTemplate = cloneTemplate<HTMLTemplateElement>('#success');
const formOrderTemplate = cloneTemplate<HTMLTemplateElement>('#order');
const formContactsTemplate = cloneTemplate<HTMLTemplateElement>('#contacts');

const header = new Header(events, headerContainer); // - классы представления 
const gallery = new Gallery(events, page)
const cardPreview = new CardPreview(events, cardPreviewTemplate);
const modal = new Modal(events, modalContainer);
const basket = new BasketView(events, basketTemplate);
const order = new SuccessOrder(events, successTemplate);
const formOrder = new FormOrder(events, formOrderTemplate);
const formContacts = new FormContacts(events, formContactsTemplate);

async function initApi() {
  try {
    const res = await api.getProducts();
    const newData = res.items;
    productsModels.setProducts(newData);
  }
  catch (err) {
    console.log('Ошибка получения данных', err);
  }
}

initApi();

events.on('catalog:change', () => {
  const arrCards = productsModels.getProducts();
  console.log(arrCards);

  const results: HTMLElement[] = arrCards.map(elem => {
    const cardElementTemplate = cloneTemplate<HTMLTemplateElement>('#card-catalog');
    const card = new CardFull(events, cardElementTemplate, {
      onClick: () => {
        events.emit('card:select', {id: elem.id});
      }
    });
    return card.render(elem);
  });
  gallery.catalog = results;
})

events.on('card:select', (data: {id: string}) => {
  productsModels.setProduct(data.id); // - нужно взять где-то id, чтобы отрисовать нужную карточку 
})

events.on('card:save', ()=> {
  const selectedProduct = productsModels.getProduct();
  if(!selectedProduct) return
  if(selectedProduct.price === null) {
    cardPreview.buttonText = 'Недоступно';
    cardPreview.stateButton = true;
  } else if(productInBasket.checkProductByID(selectedProduct?.id)){
    cardPreview.buttonText = 'Убрать из корзины';
    cardPreview.stateButton = false;
  } else {
    cardPreview.buttonText = 'В корзину'
    cardPreview.stateButton = false;
  }
  cardPreview.render(selectedProduct);
  modal.content = cardPreview.render();
  modal.open();
})

events.on('cardPreview:buy', ()=> {
  const selectedProduct = productsModels.getProduct();
  if(!selectedProduct) return;
  if(productInBasket.checkProductByID(selectedProduct?.id)) {
    productInBasket.removeProduct(selectedProduct);
  } else {
    productInBasket.addProduct(selectedProduct);
  }
  modal.close();
})

events.on('basket:change', () => {
  header.counter = productInBasket.getCount();
  const element = productsModels.getProduct();
  if(!element) return;
  const arrElem = productInBasket.getProducts();
  const results = arrElem.map((elem, index) => {
    const cardBasketTemplate = cloneTemplate<HTMLTemplateElement>('#card-basket');
    const cardBasket = new CardBasket(events, cardBasketTemplate, {
      onDelete: () => {
        events.emit('cardBasket:delete', {id: elem.id})
      }
    });
    cardBasket.index = index + 1;
    return cardBasket.render(elem);
  })
  basket.price = productInBasket.getTotalPrice();
  basket.list = results;
  basket.render();
})

events.on('cardBasket:delete', (data: {id: string}) => {
  const product = productsModels.getProductById(data.id)
  if(!product) return;
  productInBasket.removeProduct(product);
}) 

events.on('basket:continue', ()=> {
  modal.content = formOrder.render();
  modal.open();
})

events.on('modal:close', () => {
  modal.close();
})

events.on('basket:open', () => {
  if(productInBasket.getCount() === 0) {
    basket.stateButton = true;
    basket.stateEmpty = 'Корзина пуста';
  }
  modal.content = basket.render();
  modal.open();
})

events.on('form-order:payment', (data: {method: TPayment}) => {
  buyer.setPayment(data.method);
})

events.on('form-order:address', (data: {address: string})=>{
  buyer.setAddress(data.address);
})

events.on('form-contacts-email:input', (data: {value: string})=> {
  buyer.setEmail(data.value);
})

events.on('form-contacts-phone:input', (data: {value: string})=> {
  buyer.setPhone(data.value);
})

events.on('buyer:change', ()=>{
  formOrder.payment = buyer.getData().payment;
  formOrder.address = buyer.getData().address;
  formContacts.email = buyer.getData().email;
  formContacts.phone = buyer.getData().phone;
  const { payment, address, email,  phone} = buyer.isValid();
  
  formOrder.render({
    payment: buyer.getData().payment,
    address: buyer.getData().address,
    stateButton: !payment && !address,
    errors: Object.values({ payment, address })
      .filter((i) => !!i)
      .join('; '),
  });

  formContacts.render({
    email: buyer.getData().email,
    phone: buyer.getData().phone,
    stateButton: !payment && !address,
    errors: Object.values({ email, phone })
      .filter((i) => !!i)
      .join('; '),
  });
})

events.on('order:submit', ()=> {
  formContacts.render();
  modal.content = formContacts.render();
  modal.open();
})

events.on('contacts:submit', ()=> {
  order.total = productInBasket.getTotalPrice();
  order.render();
  modal.content = order.render();
  modal.open();
})

events.on('order:continue',()=>{
  modal.close();
})
