import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IOrder {
  total: number;
}

export class Order extends Component<IOrder> {
  protected orderButton: HTMLButtonElement;
  protected totalElement: HTMLElement;
  protected events: IEvents;

  constructor(events: IEvents, container: HTMLElement){
    super(container);
    this.events = events;
    this.orderButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.totalElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    
    this.orderButton.addEventListener('click', ()=> {
      this.events.emit('order:continue')
    })
  }

  set total(value: number) {
    this.totalElement.textContent = `Списано ${String(value)} синапсов`
  }  
}