import { useState } from 'react';
import './App.css';
import TodoList from './TodoList';

const taskList = [
  {
    id: 1,
    title: 'Создать проект React',
  },
  {
    id: 2,
    title: 'Подготовить данные нашего списка задач',
  },
];

let nextId = 3;

function App() {
  const [todoList, setTodoList] = useState(taskList);
  const [inputText, setInputText] = useState('');

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
