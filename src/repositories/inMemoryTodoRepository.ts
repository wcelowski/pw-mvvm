import TodoListModel from "../models/todoListModel";

type ToDoRepository = {
    find: () => Promise<TodoListModel>;
}

const find = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    }).then(() => {
        return toDoList;
    })
}


const toDoList: TodoListModel = new TodoListModel(
    [
        'item1',
        'item2',
        'item3'
    ]
);

const inMemoryToDoRepository: ToDoRepository = {
    find: find
}

export {inMemoryToDoRepository}