import { expect } from 'chai';
import 'mocha';
import TodoListModel from "../../models/todoListModel";

describe('To Do Model', () => {

    it('should add new items', () => {
        const item = 'item1'
        const model = new TodoListModel();
        model.addItem('item1');
        expect(model.getItems()[0]).to.equal(item);
    });

});