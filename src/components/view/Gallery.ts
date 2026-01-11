import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;
  protected events: IEvents;

  constructor(events: IEvents, container: HTMLElement){
    super(container);
    this.events = events;

    this.catalogElement = ensureElement<HTMLElement>('.gallery', this.container);

    this.events.on('catalog:change', () => {
      console.log('Каталог заполнился карточками');
    });
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}