import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component"
import { IEvents } from "../base/Events"

export interface IForm {
  errors: string;
  stateButton: boolean;
}

export class Form<T> extends Component<IForm&T> {
  protected events: IEvents;
  protected buttonSubmit: HTMLButtonElement;
  protected formErrors: HTMLElement;

  constructor(events: IEvents, container: HTMLElement) {
    super(container)
    this.events = events;

    this.buttonSubmit = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.formErrors = ensureElement<HTMLElement>('.form__errors', this.container);

    this.container.addEventListener('submit', (e:Event)=>{
      e.preventDefault();
      const name = this.container.getAttribute('name');
      if (!name) return;
      this.events.emit(`${name}:submit`);
    })
  }

  set errors(value: string) {
    this.formErrors.textContent = value;
  }

  set stateButton(value: boolean) {
    this.buttonSubmit.disabled = !value;
  }
}