import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Feed from './Feed';
import Task from './Task';
import EditTask from './EditTask';
import Missing from './Missing';
import { useState, useEffect } from 'react';
import { useNavigate, Link} from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setTasks(null);
    getTasks();
  }, [token])

  const handleLogin = async (e) => {
    //calls our backend api using fetch with the user's inputted email/password
    //if there is an error, we want to keep the user on the login screen
    //and display the error, otherwise save the token in localStorage and navigate the user
    //to the tasks feed
    e.preventDefault();
    let response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    });
    if(response.ok){
      response = await response.json();
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setValidLogin(true);
      navigate('/tasks');
    } else{
      setValidLogin(false)
    }

  }

  const getTasks = async () => {
    const token = localStorage.getItem('token');
    let tasks = await fetch('http://localhost:3000/api/tasks', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(!tasks.ok) {
      setIsLoading(false);
    } else {
      tasks = await tasks.json();
      setTimeout(()=>{
        console.log(tasks);
        setTasks(tasks.tasks);
        setIsLoading(false);
      }, 2000);
    }
    
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            validLogin={validLogin}
          />} />
          <Route path='tasks'>
            <Route index element={<Feed 
              tasks={tasks}
              isLoading={isLoading}
            />} />
            <Route path=':id' element={<Task />} />
            <Route path='edit/:id' element={<EditTask />} />
          </Route>
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
