import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login';
import Feed from './Feed';
import Task from './Task';
import EditTask from './EditTask';
import Missing from './Missing';
import Register from './Register';
import CreateTask from './CreateTask';
import Home from './Home';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [validLogin, setValidLogin] = useState(true);
  const [validRegister, setValidRegister] = useState(true);
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setToken(token);
    }
  }, [])

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
    try {
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
      } else {
        throw Error('Invalid Login. Try Again');
      }
    } catch (error) {
      setValidLogin(false)
    }

  }

  const handleRegister = async (e) => {
    //need to call the register endpoint which is /api/auth/register using fetch api
    //need to pass in json obj containing email and password
    //if we get a 200 response, then we want to set the token in our state and we also want to add it to localStorage
    //we then want to naviagate the user to the feed
    e.preventDefault();
    let response = await fetch('http://localhost:3000/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: registerEmail, password: registerPassword})
    })
    if(response.ok) {
      response = await response.json();
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setValidRegister(true);
      navigate('/tasks');
    } else {
      setValidRegister(false);
    }

  }

  const getTasks = async () => {
    try {
      const token = localStorage.getItem('token');
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

  const handleDelete = async (e, id) => {
    //using the given task id and the token saved in our state, create a delete 
    //request to our backend api passing in our token in the header and passing in
    //the id into the request url
    //if response is good then filter out the deleted request from our task state
    //if not good then display error to screen.

    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.ok) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error.message);
    }
    

  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login 
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            validLogin={validLogin}
          />} />
          <Route path='register' element={<Register 
            registerEmail={registerEmail}
            setRegisterEmail={setRegisterEmail}
            registerPassword={registerPassword}
            setRegisterPassword={setRegisterPassword}
            handleRegister={handleRegister}
            validRegister={validRegister}
          />} />
          <Route path='tasks'>
            <Route index element={<Feed 
              tasks={tasks}
              isLoading={isLoading}
              handleDelete={handleDelete}
            />} />
            <Route path=':id' element={<Task />} />
            <Route path='edit/:id' element={<EditTask />} />
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
