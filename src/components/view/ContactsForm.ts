import { ensureElement } from '../../utils/utils';
import { IEvents } from './../base/Events';
import { Form } from "./Form";

interface IFormContacts {
  email: string;
  phone: string;
}

export class FormContacts extends Form<IFormContacts> {
  protected formInputEmail: HTMLInputElement;
  protected formInputPhone: HTMLInputElement;

  constructor(events: IEvents, container: HTMLElement){
    super(events, container)

    this.formInputEmail = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.formInputPhone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);

    this.formInputEmail.addEventListener('input', ()=> {
      this.events.emit('form-contacts-email:input', {
        value: this.formInputEmail.value
      });
    })

    this.formInputPhone.addEventListener('input', ()=> {
      this.events.emit('form-contacts-phone:input', {
        value: this.formInputPhone.value
      });
    })
  }

  set email(value: string) {
    this.formInputEmail.value = value;
  }

  set phone(value: string) {
    this.formInputPhone.value = value;
  }
}