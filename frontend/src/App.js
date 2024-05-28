
import './App.css';
import {Routes, Route} from "react-router-dom";
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import UploadPDF from './components/UploadPDF';
import Unit1 from './components/Units/Unit1';






function App() {
  return (
    <div className="App">
     
      

      <Routes>

        
        <Route path='/uploadpdf' element={<UploadPDF/>}/>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/unit1' element={<Unit1/>}/>
        

      </Routes>
    </div>

     
    
  );
}

export default App;
