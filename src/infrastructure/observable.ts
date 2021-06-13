export default class Observable {
    private listeners: Function[];
    private value: any;

    constructor(value: any) {
        this.listeners = [];
        this.value = value;
    }

    notify() {
        this.listeners.forEach(listener => listener(this.value));
    }

    subscribe(listener: Function) {
        this.listeners.push(listener);
    }

    getValue() {
        return this.value;
    }

    setValue(val: any) {
        if (val !== this.value) {
            this.value = val;
            this.notify();
        }
    }
}