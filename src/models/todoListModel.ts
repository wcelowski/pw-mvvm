export default class TodoListModel {
    private readonly todoItems: string[] = [];

    public constructor(todoItems?: string[])
    {
        this.todoItems = todoItems;
    }

    public getItems(): string[]
    {
        return this.todoItems;
    }

    public addItem(todoItem: string)
    {
        this.todoItems.push(todoItem)
    }
}