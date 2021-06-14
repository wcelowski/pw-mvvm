import Observable from "./observable";

type Handlers = { [key: string]: Function }
type Data = { [key: string]: Observable }

interface ViewModel {
    main?: () => void;
}

export default class viewModel implements ViewModel {
    public main () {
        this.applySubscribers();
        this.applyMounted();
        this.applyDataBindings();
        this.applyCommandHandlers();
    }

    protected data: {}
    protected handlers: {};

    protected applySubscribers () {};

    protected applyMounted () {};

    protected applyDataBindings () {
        document.querySelectorAll("[data-bind]").forEach(element => {
            if (element instanceof HTMLInputElement) {
                const observable = this.data[element.getAttribute("data-bind")];
                element.value = observable.getValue();
                observable.subscribe(() => element.value = observable.getValue());
                element.onkeyup = () => observable.setValue(element.value);
            }
        });
    }

    protected applyCommandHandlers () {
        document.querySelectorAll('[on-click]')
            .forEach(element => {
                const prop = element.getAttribute('on-click');
                // @ts-ignore
                element.addEventListener('click', handlers[prop], false)
            })
    }

    protected applyForEach (values: Array<any>) {
        document.querySelectorAll('[for-each]')
            .forEach(element => {
                const prop = element.getAttribute('for-each')
                // @ts-ignore
                if ((this.data[prop] as Observable).getValue() === values) {
                    let foreachHtml: string = '';
                    values.forEach(value => {
                        foreachHtml += `<li>${value}</li>`
                    })
                    element.innerHTML = `<ul>${foreachHtml}</ul>`
                }
            })
    }
}