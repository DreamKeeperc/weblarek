import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/Events";
import { CardFull } from "./CardFull";

interface ICardPreview {
  description: string;
  buttonText: string;
  stateButton: boolean;
}

export class CardPreview extends CardFull<ICardPreview> {
  protected buyButton: HTMLButtonElement;
  protected descriptionElement: HTMLElement;
  
  constructor(events: IEvents, container: HTMLElement) {
    super(events, container)
    this.buyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container); 

    this.buyButton.addEventListener('click', ()=>{
      this.events.emit('cardPreview:buy');
    })
  }

  set description(value: string) {
    this.descriptionElement.textContent = value;
  }

  set buttonText(value: string) {
    this.buyButton.textContent = value;
  }

  set stateButton(state: boolean) {
    this.buyButton.disabled = state;
  }
}