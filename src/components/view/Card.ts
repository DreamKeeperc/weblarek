import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface ICard {
  title: string;
  price: number | null;
}

export class Card<T> extends Component<ICard&T> {
  protected titleElement: HTMLElement;
  protected priceElement: HTMLElement;
  protected events: IEvents;

  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    this.events = events;
    
    this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(name: string) {
    this.titleElement.textContent = name;
  }

  set price(value: number | null) {
    if (value === null) {
      this.priceElement.textContent = 'Бесценно';
    } else {
      this.priceElement.textContent = String(`${value} синапсов`);
    }
  }  
}
