import './todo-list.css';
function TodoList(props) {
  const { data } = props;

  const todoList = data.map((todo) => <li key={todo.id}>{todo.title}</li>);

  return (
    <div className="todo-list">
      <h2>Задачи</h2>
      {todoList.length > 0 ? (
        <ul className="todo-list__items">{todoList}</ul>
      ) : (
        <div>Пока нет задач</div>
      )}
    </div>
  );
}

export default TodoList;
