import { Errors, IBuyer, TPayment } from "../../types"
import { IEvents } from "../base/Events";

export class Buyer {
  protected payment: TPayment = '';
  protected address: string = '';
  protected phone: string = '';
  protected email: string = '';
  protected events: IEvents;

  constructor (events: IEvents) {
    this.events = events;
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
    this.events.emit('buyer:change')
  }

  setAddress(address: string): void {
    this.address = address;
    this.events.emit('buyer:change')
  }

  setPhone(phone: string): void {
    this.phone = phone;
    this.events.emit('buyer:change')
  }

  setEmail(email: string):void {
    this.email = email
    this.events.emit('buyer:change')
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email
    }
  }

  clearData(): void {
    this.payment = '' as TPayment;
    this.address = '';
    this.phone =  ''; 
    this.email = '';  // - очистка данных покупателя;
    this.events.emit('buyer:change');
  }

  isValid(): Errors {
    const errors: Errors = {};
    if(!this.payment){
      errors.payment = 'Не выбран вид оплаты'
    } 

    if(!this.address?.trim()){
      errors.address = 'Укажите адрес'
    }

    if(!this.phone?.trim()){
      errors.phone = 'Укажите номер'
    }

    if(!this.email?.trim()){
      errors.email = 'Укажите емэйл'
    }
    return errors
  }
}