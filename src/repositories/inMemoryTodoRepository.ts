import todoListModel, {Model} from "../models/todoListModel";

type Repository = {
    find: () => Promise<Model>;
}

const find = () => {
    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    }).then(() => {
        return toDoList;
    })
}


const toDoList: todoListModel = new todoListModel(
    [
        'item1',
        'item2',
        'item3'
    ]
);

const inMemoryToDoRepository: Repository = {
    find: find
}

export {inMemoryToDoRepository}