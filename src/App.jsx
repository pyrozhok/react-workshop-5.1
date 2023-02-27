import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks && tasks.length > 0) {
      return tasks;
    }

    return [];
  });
  const [inputText, setInputText] = useState('');

  let nextId = todoList.length > 0 ? ++todoList[todoList.length - 1].id : 1;

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todoList));
  }, [todoList]);

  const handleAddTodoClick = () => {
    setTodoList([...todoList, { id: nextId++, title: inputText }]);
    setInputText('');
  };

  const handleRemoveTodoClick = (taskId) => {
    const tasks = todoList.filter((task) => task.id !== taskId);
    setTodoList(tasks);
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
      <TodoList data={todoList} onDelete={handleRemoveTodoClick} />
    </div>
  );
}

export default App;
