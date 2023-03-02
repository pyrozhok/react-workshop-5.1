import './todo-list.css';
function TodoList(props) {
  const { data, onDelete, favourites, onMarkFavourite } = props;

  /* Функция возвращает название класса для стилизации задачи.
   Если задача есть в списке избранных, то применяем стили с для избранных задач, иначе обычный стиль */
  const getClass = (taskId) => {
    const result = favourites.find((favouriteTasks) => favouriteTasks.id === taskId);
    if (result) {
      return 'task-body-favourite';
    }

    return 'task-body';
  };

  const todoList = data.map((todo) => (
    <li key={todo.id}>
      <span className={getClass(todo.id)} onClick={() => onMarkFavourite(todo)}>
        {todo.title}
      </span>
      <button onClick={() => onDelete(todo.id)}>Удалить</button>
    </li>
  ));

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
