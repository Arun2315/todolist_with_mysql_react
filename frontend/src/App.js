import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.js';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Fetch all todos
  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  // Add a new todo
  const addTodo = () => {
    axios.post('http://localhost:5000/api/todos', { title, description })
      .then(response => {
        setTodos([...todos, response.data]);
        setTitle('');
        setDescription('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  // Update a todo
  const updateTodo = (id) => {
    const updatedTitle = prompt('Enter new title:');
    const updatedDescription = prompt('Enter new description:');
    axios.put(`http://localhost:5000/api/todos/${id}`, { title: updatedTitle, description: updatedDescription })
      .then(response => {
        setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
      })
      .catch(error => console.error('Error updating todo:', error));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:5000/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(error => console.error('Error deleting todo:', error));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => updateTodo(todo._id)}>Edit</button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
