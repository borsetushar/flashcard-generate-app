import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import MyFlashCard from './Components/MyFlashCard';
import FlashCardDetails from './Components/FlashCardDetails';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>    
        <Route path='/myflashcard' element={<MyFlashCard/>}></Route>
        <Route path="/flashcarddetails/:groupId" element={<FlashCardDetails/>} />
      </Routes>   
      <ToastContainer/>
    </div>
  );
}

export default App;
