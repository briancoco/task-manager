import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './Layout';
import Login from './Login';
import Feed from './Feed';
import Task from './Task';
import EditTask from './EditTask';
import Missing from './Missing';
import Register from './Register';
import CreateTask from './CreateTask';
import Home from './Home';

function App() {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  }, [])

  useEffect(() => {

    const getTasks = async () => {
      try {
        let tasks = await fetch('http://localhost:3000/api/tasks', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if(tasks.ok) {
          tasks = await tasks.json();
          setTasks(tasks.tasks);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false)
      }
      
    }

    setTasks(null);
    if(token) {
      setIsLoading(true);
      getTasks();
    } else {
      setIsLoading(false);
    }
  }, [token])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login 
            navigate={navigate}
            setToken={setToken}
          />} />
          <Route path='register' element={<Register 
            navigate={navigate}
            setToken={setToken}
          />} />
          <Route path='tasks'>
            <Route index element={<Feed 
              tasks={tasks}
              setTasks={setTasks}
              isLoading={isLoading}
              token={token}
            />} />
            <Route path=':id' element={<Task 
              tasks={tasks}
            />} />
            <Route path='edit/:id' element={<EditTask 
              tasks={tasks}
              setTasks={setTasks}
              token={token}
              navigate={navigate}
            />} />
            <Route path='create' element={<CreateTask 
              navigate={navigate}
              setTasks={setTasks}
              tasks={tasks}
            />} />
          </Route>
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
