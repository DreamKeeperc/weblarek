import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { Form } from "./Form";

interface IFormOrder {
  address: string;
  payment: string;
}

export class FormOrder extends Form<IFormOrder> {
  protected formCashButton: HTMLButtonElement;
  protected formCardButton: HTMLButtonElement;
  protected formOrderInput: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)

    this.formCashButton = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.formCardButton = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.formOrderInput = ensureElement<HTMLInputElement>('input[name="address"]', this.container);

    this.formCardButton.addEventListener('click', ()=>{
      this.events.emit('form-order:payment', {method: 'card'})
    })

    this.formCashButton.addEventListener('click', ()=>{
      this.events.emit('form-order:payment', {method: 'cash'})
    })

    this.formOrderInput.addEventListener('input', ()=>{
      this.events.emit('form-order:address', {address: this.formOrderInput.value})
    })
  }

  set address(name: string) {
    this.formOrderInput.value = name;
  }

  set payment(value: string) {
    this.formCashButton.classList.toggle('button_alt-active', value === 'cash');
    this.formCardButton.classList.toggle('button_alt-active', value === 'card');
  }
}