import {inMemoryToDoRepository} from "../repositories/inMemoryTodoRepository";
import todoListModel from "../models/todoListModel";
import Observable from "../infrastructure/observable";
import ViewModel from "../infrastructure/viewModel";

class TodoViewModel extends ViewModel {
    protected data = {
        isLoading: new Observable(false),
        todoList: new Observable(null),
        todoListItems: new Observable([]),
        newItem: new Observable(''),
    }

    public applySubscribers() {
        this.data.todoListItems.subscribe((values: string[]) => this.applyForEach(values));
        this.data.todoList.subscribe((value: any) => {
            this.data.todoListItems.setValue(value.getItems());
        })
        this.data.isLoading.subscribe((isLoading: boolean) => this.handlers.initializeLoader(isLoading));
    }

    protected handlers = {
        fetchToDoList: async (): Promise<void> => {
            this.data.isLoading.setValue(true);
            const todoList = await (inMemoryToDoRepository.find() as Promise<todoListModel>);
            this.data.todoList.setValue(todoList);
            this.data.todoListItems.setValue(this.data.todoList.getValue().getItems());
            this.data.isLoading.setValue(false);
        },
        initializeLoader: (isLoading: boolean) => {
            document.getElementById('todo-loader')
                ?.setAttribute('style', `display: ${isLoading ? 'block' : 'none'}`);
        },
        addItem: (item: string) => {
            this.data.todoList.setValue(
                new todoListModel([...this.data.todoListItems.getValue(), this.data.newItem.getValue()])
            );
        }
    }

    public applyMounted () {
        this.handlers.fetchToDoList.call(this.data);
    }
}

export default function initializer() {
    const todoViewModel = new TodoViewModel();
    todoViewModel.applySubscribers();
    todoViewModel.applyDataBindings();
    todoViewModel.applyCommandHandlers();
    todoViewModel.applyMounted();
}