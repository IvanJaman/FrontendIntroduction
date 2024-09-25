import './App.css';
import { Button } from './Button';
import { Table } from './Table';
import { InputBar } from './InputBar';
import { useState, useEffect  } from 'react';

function App() {
  const [firstName, setFirstName] = useState(''); 
  const [lastName, setLastName] = useState(''); 
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  const saveToLocalStorage = (data) => {
    localStorage.setItem('users', JSON.stringify(data));
  };

  const loadFromLocalStorage = () => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    return [];
  };

  useEffect(() => {
    setUsers(loadFromLocalStorage());
  }, []);

  const handleSubmit = () => {
    if(!firstName || !lastName){
      alert("Please provide a user.");
    }
    else{
      if (editId !== null) {
        const updatedTable = users.map(item =>
          item.id === editId
            ? { ...item, firstName: firstName, lastName: lastName }
            : item
        );
        setUsers(updatedTable);
        saveToLocalStorage(updatedTable);
        setEditId(null);
      } 
    else {
      const newData = { id: Date.now(), firstName: firstName, lastName: lastName };
      const updatedTable = [...users, newData];
      setUsers(updatedTable);
      saveToLocalStorage(updatedTable); 
    }
    setFirstName(''); 
    setLastName(''); 
    }
  };

  const handleEdit = (id, firstName, lastName) => {
    setEditId(id);
    setFirstName(firstName);
    setLastName(lastName);
  };

  const handleDelete = (id) => {
    const updatedTable = table.filter(item => item.id !== id);
    setUsers(updatedTable);
    saveToLocalStorage(updatedTable);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>MyReactApp</h1>
        <h2>{editId ? 'Edit user info:' : 'Enter user info:'}</h2>
        <InputBar inputValue={firstName} setInputValue={setFirstName} placeholder="First Name" />
        <InputBar inputValue={lastName} setInputValue={setLastName} placeholder="Last Name" />
        <Button handleSubmit={handleSubmit} />
        <Table data={users} onEdit={handleEdit} onDelete={handleDelete}/>
      </header>
    </div>
  );
}

export default App;
