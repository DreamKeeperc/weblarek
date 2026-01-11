import { ICardActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { IEvents } from './../base/Events';
import { Card } from "./Card";

interface ICardBasket {
  index: number;
}

export class CardBasket extends Card<ICardBasket> {
  protected deleteButton: HTMLButtonElement;
  protected indexElement: HTMLElement;

  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions) {
    super(events, container)
    this.deleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.indexElement = ensureElement<HTMLImageElement>('.basket__item-index', this.container);

    if(actions?.onDelete) {
      this.container.addEventListener('click', actions.onDelete);
    }
  }

  set index(value: number) {
      this.indexElement.textContent = String(value);
  }
}