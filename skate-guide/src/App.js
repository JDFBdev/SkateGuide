import './App.css';
import Home from './Components/Home/Home';
import ChangePass from './Components/ChangePass/ChangePass';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/changePassword/:param' element={<ChangePass/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
