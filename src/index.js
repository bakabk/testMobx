import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {observer} from 'mobx-react';

import todoStore from './todoStore';

const TodoView = observer(({todo}) => {
    const {completed, task} = todo;

    const handleChange = () => {
        todo.completed = !todo.completed;
    }

    return <li>
        <input type="checkbox" checked={completed} onChange={handleChange}/>
        {task}
    </li>
});

const TodoList = observer(class TodoList extends React.Component {
    handleAddTodo = () => {
        const {store} = this.props;
        store.addTodo(prompt('Введите название задачи', 'drink coffe'));
    }

    render() {
        const {store} = this.props;
        const preparedTodoList = store.todos.map((todo, i) => <TodoView key={i} todo={todo} />);
        console.log('>>>', this);

        return <>
            <div className="App">
                <h1>Hellow world</h1>
                <div className='App_counter-wrapper'>
                    <ul className='App_todo-list'>{preparedTodoList}</ul>
                    <button onClick={this.handleAddTodo}>add TODO</button>
                </div>
            </div>
        </>
    }
});

ReactDOM.render(
    <React.StrictMode>
        <TodoList store={todoStore} />,
    </React.StrictMode>,
    document.getElementById('root')
);