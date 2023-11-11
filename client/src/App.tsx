
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './assets/Pages/HomePage'
import { ThemeProvider } from "@material-tailwind/react";
import SignUpPage from './assets/Pages/SignUpPage';
import LoginPage from './assets/Pages/LoginPage';
import './App.css'
import { useSelector } from 'react-redux';
import PdfList from './assets/Pages/PdfList';

function App() {

  const reduxToken = useSelector((store: { user: { token: string } }) => store.user.token)

  return (
    <BrowserRouter>
   
    <ThemeProvider>
      <Routes>
        <Route path='/' element={reduxToken?<HomePage />:<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/prev-project' element={<PdfList />} />

      </Routes>
      </ThemeProvider>
    </BrowserRouter>


  )
}

export default App
