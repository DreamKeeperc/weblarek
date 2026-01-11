import { CDN_URL } from './../../utils/constants';
import { ICardActions, IProduct } from '../../types/index';
import { categoryMap } from '../../utils/constants';
import { ensureElement } from '../../utils/utils';
import { IEvents } from '../base/Events';
import { Card } from './Card';

export type TCardFull = Pick<IProduct, 'image' | 'category'>;
export type categoryKey = keyof typeof categoryMap;

export class CardFull<T> extends Card<TCardFull&T> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  
  constructor(events: IEvents, container: HTMLElement, actions?: ICardActions) {
    super(events, container);
    
    this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.categoryElement = ensureElement<HTMLElement>('.card__price', this.container);
    
    if(actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }

  set category(name: string) {
    this.categoryElement.textContent = name;
   /* for(const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as categoryKey],
        key === name
      )
    }
      */
  }

  set image(value: string) {
    this.setImage(this.imageElement, `${CDN_URL}${value}`, this.title);
  }
}