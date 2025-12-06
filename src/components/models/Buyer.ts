import { IBuyer, TPayment, validationErrors, validationResult } from "../../types"

export class Buyer {
  protected _payment: TPayment;
  protected _address: string;
  protected _phone: string;
  protected _email: string;

  constructor (payment: TPayment, address: string, phone: string, email: string) {
    this._payment = payment,
    this._address = address,
    this._phone = phone,
    this._email = email
  }

  set payment(payment: TPayment) {
    this._payment = payment;
  }

  set address(address: string) {
    this._address = address;
  }

  set phone(phone: string) {
    this._phone = phone;
  }

  set email(email: string) {
    this._email = email
  }

  getData(): IBuyer {
    return {
      payment: this._payment,
      address: this._address,
      phone: this._phone, 
      email: this._email
    }
  }

  clearData(): void {
    this._payment = '' as TPayment;
    this._address = '';
    this._phone =  ''; 
    this._email = '';  // - очистка данных покупателя;
  }

  isValid(email: string, phone: string, address: string, payment: TPayment): validationResult {
    const errors: validationErrors = {};

    if(!email || email.trim().length <= 0) {
      errors.email = 'Укажите почту'
    } 

    if(!phone || phone.trim().length <= 0) {
      errors.phone = 'Укажите номер телефона'
    }
    
    if(!address || address.trim().length <= 0) {
      errors.address = 'Укажите адрес доставки'
    }

    if(!payment) {
      errors.payment = 'Выберите способ оплаты';
    }
   
    if (Object.keys(errors).length === 0) {
      return {
        isValid: true,
        data: this.getData()
      }
    } else {
      return {
        isValid: false,
        errors: errors
      };
    }
  }
}