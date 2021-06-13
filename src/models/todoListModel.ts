interface Model {}

export default class todoListModel implements Model {
    private readonly todoItems: string[];

    public constructor(todoItems: string[])
    {
        this.todoItems = todoItems;
    }

    public getItems(): string[]
    {
        return this.todoItems;
    }

    public addItems(todoItems: string[])
    {
        this.todoItems.concat(todoItems)
    }
}

export {Model}