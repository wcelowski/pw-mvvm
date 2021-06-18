import Observable from "./observable";

type Handlers = { [key: string]: Function }
type Data = { [key: string]: Observable }
type CommandHandler = (this: HTMLButtonElement, ev: MouseEvent) => any;

export default class ViewModel {
    protected data: Data = {}
    protected handlers: Handlers = {};

    public applySubscribers () {
        throw new Error('Not implemented');
    };

    public applyMounted () {
        throw new Error('Not implemented');
    };

    public applyDataBindings () {
        document.querySelectorAll("[data-bind]").forEach(element => {
            if (element instanceof HTMLInputElement) {
                const observable = this.data[element.getAttribute("data-bind")];
                element.value = observable.getValue();
                observable.subscribe(() => element.value = observable.getValue());
                element.onkeyup = () => observable.setValue(element.value);
            }
        });
    }

    public applyCommandHandlers () {
        document.querySelectorAll('[on-click]')
            .forEach(element => {
                const prop = element.getAttribute('on-click');
                if (element instanceof HTMLButtonElement) {
                    element.addEventListener('click', (this.handlers[prop] as CommandHandler), false)
                }
            })
    }

    public applyForEach (values: Array<any>) {
        document.querySelectorAll('[for-each]')
            .forEach(element => {
                const prop = element.getAttribute('for-each')
                if ((this.data[prop] as Observable).getValue() === values) {
                    let foreachHtml: string = '';
                    values.forEach(value => {
                        foreachHtml += `<li class="list-group-item">${value}</li>`
                    })
                    element.innerHTML = `<ul class="list-group py-5">${foreachHtml}</ul>`
                }
            })
    }
}