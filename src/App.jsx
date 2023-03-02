import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [favouriteTodoList, setFavouriteTodoList] = useState([]);
  const [inputText, setInputText] = useState('');

  let nextId = todoList.length > 0 ? ++todoList[todoList.length - 1].id : 1;

  useEffect(() => {
    let ignore = false;

    // Или можно использовать Wretch https://github.com/elbywan/wretch
    fetch('https://629470d963b5d108c18b87da.mockapi.io/todos')
      .then((res) => {
        if (!res.ok) {
          switch (res.status) {
            case 400:
              throw new Error('Bad request');

            case 401:
              throw new Error('Unauthorized');

            case 404:
              throw new Error('Not found');

            case 500:
              throw new Error('Internal server error');
          }
        }
        return res.json();
      })
      .then((data) => {
        if (data.length > 0 && !ignore) {
          setTodoList(data);
        }
      })
      .catch((err) => console.error(err));

    return () => {
      ignore = true;
    };
  }, []);

  const handleAddTodoClick = () => {
    setTodoList([...todoList, { id: nextId++, title: inputText }]);
    setInputText('');
  };

  const handleRemoveTodoClick = (taskId) => {
    const tasks = todoList.filter((task) => task.id !== taskId);
    setTodoList(tasks);
  };

  const handleMarkTodoFavourite = (task) => {
    /* Переменная для проверки, есть ли задача в избранном */
    const isTaskFavourite = favouriteTodoList.find((favouriveTask) => favouriveTask.id === task.id);

    /* Задачи нет в избранном — добавляем ее */
    if (!isTaskFavourite) {
      setFavouriteTodoList([...favouriteTodoList, task]);
      return;
    }

    /* Задача есть в избранном — убираем ее */
    const favouriveTasks = favouriteTodoList.filter(
      (favouriveTask) => favouriveTask.id !== task.id
    );
    setFavouriteTodoList(favouriveTasks);
  };

  return (
    <div className="app">
      <h1>Список задач</h1>
      <div>
        <input
          type="text"
          placeholder="Новая задача..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="button" onClick={handleAddTodoClick}>
          Добавить
        </button>
      </div>
      <br />
      <TodoList
        data={todoList}
        favourites={favouriteTodoList}
        onDelete={handleRemoveTodoClick}
        onMarkFavourite={handleMarkTodoFavourite}
      />
    </div>
  );
}

export default App;
