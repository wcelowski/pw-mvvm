import {inMemoryToDoRepository} from "../repositories/inMemoryTodoRepository";
import todoListModel from "../models/todoListModel";
import Observable from "../infrastructure/observable";

const main = () => {
    applySubscribers();
    applyMounted();
    applyDataBindings();
    applyCommandHandlers();
}

type Data = { [key: string]: Observable }
const data: Data = {
    isLoading: new Observable(false),
    todoList: new Observable(null),
    todoListItems: new Observable([]),
    newItem: new Observable(''),
};

const applySubscribers = () => {
    data.todoList.subscribe((value: todoListModel) => applyForEach(value.getItems()));
    // data.todoListItems.subscribe((values: any) => applyForEach(values));
    data.isLoading.subscribe((isLoading: boolean) => handlers.initializeLoader(isLoading))
}

const applyDataBindings = () => {
    document.querySelectorAll("[data-bind]").forEach(element => {
        if (element instanceof HTMLInputElement) {
            const observable = data[element.getAttribute("data-bind")];
            element.value = observable.getValue();
            observable.subscribe(() => element.value = observable.getValue());
            element.onkeyup = () => observable.setValue(element.value);
        }
    });
}

const handlers = {
    fetchToDoList: async (): Promise<void> => {
        data.isLoading.setValue(true);
        const todoList = await (inMemoryToDoRepository.find() as Promise<todoListModel>);
        data.todoList.setValue(todoList);
        // const todoListItems = todoList.getItems();
        // data.todoListItems.setValue(todoListItems);
        data.isLoading.setValue(false);
    },
    initializeLoader: (isLoading: boolean) => {
        document.getElementById('todo-loader')
            .setAttribute('style', `display: ${isLoading ? 'block' : 'none'}`);
    },
    addItem: () => {
        data.todoList.setValue(
            new todoListModel([...data.todoListItems.getValue(), data.newItem.getValue()])
        );
    }
}

const mounted = {
    fetchToDoList: handlers.fetchToDoList
}

const applyMounted = async () => {
    mounted.fetchToDoList.call(data);
}

const applyCommandHandlers = () => {
    document.querySelectorAll('[on-click]')
        .forEach(element => {
            const prop = element.getAttribute('on-click');
            // @ts-ignore
            element.addEventListener('click', handlers[prop], false)
        })
}

const applyForEach = (values: Array<any>) => {
    console.log(values);
    document.querySelectorAll('[for-each]')
        .forEach(element => {
            const prop = element.getAttribute('for-each')
            // @ts-ignore
            // if ((data[prop] as Observable).getValue() === values) {
                let foreachHtml: string = '';
                values.forEach(value => {
                    foreachHtml += `<li>${value}</li>`
                })
                element.innerHTML += `<ul>${foreachHtml}</ul>`
            // }
        })
}

export {main}