import './todo-list.css';
function TodoList(props) {
  const { data } = props;

  const todoList = data.map((todo) => <li key={todo.id}>{todo.title}</li>);

  return (
    <div className="todo-list">
      <h2>Задачи</h2>
      <ul className="todo-list__items">{todoList}</ul>
    </div>
  );
}

export default TodoList;
