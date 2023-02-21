import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoList from './TodoList';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [inputText, setInputText] = useState('');

  let nextId = todoList.length > 0 ? ++todoList[todoList.length - 1].id : 3;

  useEffect(() => {
    let ignore = false;

    axios.get('https://629470d963b5d108c18b87da.mockapi.io/todos').then((response) => {
      if (response.data.length > 0 && !ignore) {
        setTodoList(response.data);
      }
    });

    return () => {
      ignore = true;
    };
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
