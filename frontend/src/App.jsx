import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import LoginPage from './Components/LoginPage'
import Page404 from './Components/Page404'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
