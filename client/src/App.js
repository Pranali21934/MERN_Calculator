import { BrowserRouter ,Routes, Route} from 'react-router-dom';  
import React from 'react';
import Calculator from './component/Calculator';
import Login from './component/Login';
import Front from './component/Front';
import Signup from './component/Signup';
import './App.css'
function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
   <Route exact path='/' element={<Front/>}></Route>
   <Route exact path='/cal' element={<Calculator/>}></Route>
   <Route exact path='/login' element={<Login/>}></Route>
   <Route exact path='/signup' element={<Signup/>}></Route>
   </Routes>
   </BrowserRouter>

   
   </>
  );
}

export default App;