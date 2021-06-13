import {inMemoryToDoRepository} from "../repositories/inMemoryTodoRepository";
import todoListModel from "../models/todoListModel";
import Observable from "../infrastructure/observable";

const main = () => {
    applyBindings();
    applyMounted();
}

let data: { isLoading: Observable; todoList: Observable; todoListItems: Observable };
data = {
    isLoading: new Observable(false),
    todoList: new Observable(null),
    todoListItems: new Observable([]),
};

const applyBindings = () => {
    data.todoListItems.subscribe((values: any) => applyForEach(values));
    data.isLoading.subscribe((isLoading: boolean) => handlers.initializeLoader(isLoading))
}

const handlers = {
    fetchToDoList: async (): Promise<void> => {
        data.isLoading.setValue(true);
        const todoList = await (inMemoryToDoRepository.find() as Promise<todoListModel>);
        data.todoList.setValue(todoList);
        const todoListItems = todoList.getItems();
        data.todoListItems.setValue(todoListItems);
        data.isLoading.setValue(false);
    },
    initializeLoader: (isLoading: boolean) => {
        console.log(isLoading);
        document.getElementById('todo-loader')
            // .setAttribute('style', `display: none`);
            .setAttribute('style', `display: ${isLoading ? 'block' : 'none'}`);
        console.log(isLoading);
    }
}

const mounted = {
    fetchToDoList: handlers.fetchToDoList
}

// const bindValue = (input: HTMLInputElement, observable: Observable) => {
//     input.value = observable.getValue();
//     observable.subscribe(() => input.value = observable.getValue());
//     input.onkeyup = () => observable.setValue(input.value);
// }

const applyMounted = async () => {
    mounted.fetchToDoList.call(data);
}

const applyForEach = (values: Array<any>) => {
    document.querySelectorAll('[for-each]')
        .forEach(element => {
            const prop = element.getAttribute('for-each')
            // @ts-ignore
            if ((data[prop] as Observable).getValue() === values) {
                let foreachHtml: string = '';
                values.forEach(value => {
                    foreachHtml += `<li>${value}</li>`
                })
                element.innerHTML += `<ul>${foreachHtml}</ul>`
            }
        })
}

export {main}