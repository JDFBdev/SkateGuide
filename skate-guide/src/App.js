import './App.css';
import Home from './Components/Home/Home';
import ChangePass from './Components/ChangePass/ChangePass';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [user, setUser] = useState('');
  const [data, setData] = useState({});

  axios.defaults.withCredentials = true;

  useEffect( ()=>{
    const fetchData = async function(){
      await axios.get('https://skate-guide-backend.herokuapp.com/login').then((response)=>{
        if(response.data.loggedIn){
          setUser(response.data.user.username);
          setData(response.data.user);
        }
      })
    }
    fetchData()
  },[])

  return (
    <div className="App">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} data={data} setData={setData} />}/>
          <Route path='/changePassword/:param' element={<ChangePass/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
