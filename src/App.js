import React from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Homepage from './components/Homepage';
import LoginForm from './components/LogioForm';
import RegisterForm from './components/RegisterForm';
import DeleteForm from './components/DeleteForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage/>}/>
          <Route path="/login" element={<LoginForm/>}/>         
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path='/delete' element={<DeleteForm/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
