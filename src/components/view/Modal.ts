import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IModal {
  content: HTMLElement;
}

export class Modal extends Component<IModal> {
  protected modalButton: HTMLButtonElement;
  protected modalElement: HTMLElement;
  protected events: IEvents;
  
  constructor(events: IEvents, container: HTMLElement) {
    super(container);
    this.events = events;
    this.modalButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalElement = ensureElement<HTMLElement>('.modal__content', this.container);

    this.modalButton.addEventListener('click', () => {
      this.events.emit('modal:close')
    })

    this.container.addEventListener('click', ()=>{
      this.events.emit('modal:close')
    })

    this.modalElement.addEventListener('click', ()=>{
      event?.stopPropagation();
    })

    document.addEventListener('keydown', (e: KeyboardEvent)=>{
      if(e.key === 'Escape') {
        e.preventDefault();
        this.container.focus();
        this.events.emit('modal:close');
      }
    })
  }

  set content(element: HTMLElement) {
    this.modalElement.replaceChildren(element);
  }

  open(): void {
    this.container.classList.add('modal_active');
  }

  close(): void {
    this.container.classList.remove('modal_active');
  }
}