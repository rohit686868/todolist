import React, { useState } from 'react'
import "./App.css";
import Todoform from './Component/Todoform';
import Todolist from './Component/Todolist';

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault(); /*No to refresh the page everytime we */

    if(editId) {
       const editTodo=todos.find((i) => i.id === editId);
       const updatedTodos=todos.map((t)=>
         t.id === editTodo.id
           ? (t = {id: t.id,todo})
           : {id: t.id, todo: t.todo}
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {

    const editTodo=todos.find((i)=>i.id===id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
     <div className='App'>
     <div className="container">
      <h1>ToDo List App</h1>
    <Todoform
     handleSubmit={handleSubmit}
     todo={todo} editId={editId}
     setTodo={setTodo}/>

    <Todolist 
      todos={todos}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      />
     </div>
    </div>
  );
};

export default App
