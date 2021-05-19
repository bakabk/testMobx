import {observable, computed, autorun, makeObservable, action} from "mobx";

class ObservableTodoStore  {
    todos = [];
    pendingRequests = 0;

    constructor() {
        makeObservable(this, {
            todos: observable,
            pendingRequests: observable,
            completedTodosCount: computed,
            report: computed,
            addTodo: action
        });
        autorun(() => console.log(this.report));
    }

    get completedTodosCount() {
        return this.todos.filter(
            todo => todo.completed === true
        ).length;
    }

    get report() {
        if (this.todos.length === 0)
            return "<none>";

        return `Next todo: "${this.todos[0].task}". ` +
            `Progress: ${this.completedTodosCount}/${this.todos.length}`;
    }

    addTodo(task) {
        this.todos.push({
            id: +new Date(),
            task: task,
            completed: false,
            assignee: null
        });
    }
}

const observableTodoStore  = new ObservableTodoStore ();
observableTodoStore.addTodo("read MobX tutorial");
observableTodoStore.addTodo("try MobX");
observableTodoStore.todos[0].completed = true;

export default observableTodoStore ;