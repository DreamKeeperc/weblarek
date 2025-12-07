import { Errors, IBuyer, TPayment } from "../../types"

export class Buyer {
  protected payment: TPayment | null = null;
  protected address: string | null = null;
  protected phone: string | null = null;
  protected email: string | null = null;

  constructor () {
  }

  setPayment(payment: TPayment): void {
    this.payment = payment;
  }

  setAddress(address: string): void {
    this.address = address;
  }

  setPhone(phone: string): void {
    this.phone = phone;
  }

  setEmail(email: string):void {
    this.email = email
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
  }

  isValid():Errors {

    const errors: Errors = {};

    if(!this.payment?.trim()){
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