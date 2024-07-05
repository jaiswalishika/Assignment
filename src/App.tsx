import Data from './components/Data'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/form'
import './App.css'


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Form />} />
        <Route path="/data" element={<Data />} />
      </Routes >
    </BrowserRouter>  
    </>
  )
}

export default App
