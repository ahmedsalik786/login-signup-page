import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './page/LoginPage';
import Dashboard from './page/Dashboard';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
