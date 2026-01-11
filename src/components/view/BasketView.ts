import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasketView {
  list: HTMLElement[] | null;
  price: number;
  stateButton: boolean;
  stateEmpty: string;
}

export class BasketView extends Component<IBasketView> {
  protected orderButton: HTMLButtonElement;
  protected listElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected events: IEvents;
  
  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    this.events = events;

    this.orderButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);

    this.orderButton.addEventListener('click', (evt)=> {
      evt.preventDefault();
      this.events.emit('basket:continue')
    })
  }
  
  set list(item: HTMLElement[]) {
    this.listElement.replaceChildren(...item);
    this.orderButton.disabled = item.length === 0;
  }
  
  set price(value: number) {
    this.priceElement.textContent = String(`${value} синапсов`);
  }

  set stateButton(value: boolean) {
    this.orderButton.disabled = value
  }

  set stateEmpty(value: string) {
    this.listElement.textContent = value;
  }
}