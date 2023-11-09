
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './assets/Pages/HomePage'
import { ThemeProvider } from "@material-tailwind/react";


function App() {

  return (
    <BrowserRouter>
    <ThemeProvider>
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>


  )
}

export default App
