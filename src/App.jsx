import { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList';

let nextId = 1;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    if (todoList.length > 0) localStorage.setItem('tasks', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
      setTodoList(tasks);
    }
  }, []);

  const handleAddTodoClick = () => {
    setTodoList([...todoList, { id: nextId++, title: inputText }]);
    setInputText('');
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
      <TodoList data={todoList} />
    </div>
  );
}

export default App;
