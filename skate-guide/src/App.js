import './App.css';
import Home from './Components/Home/Home';
import TrickPage from './Components/TrickPage/TrickPage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/trick' element={<TrickPage/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
