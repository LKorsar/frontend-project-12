import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import PropTypes from 'prop-types'
import LoginPage from './Components/LoginPage'
import Page404 from './Components/Page404'
import MainPage from './Components/MainPage'
import RegistrationPage from './Components/RegistrationPage'

const PrivateRoot = ({ children }) => {
  const location = useLocation()
  const userId = JSON.parse(localStorage.getItem('token'))

  return (
    userId ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

PrivateRoot.propTypes = {
  children: PropTypes.node.isRequired,
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegistrationPage />} />
        <Route path="*" element={<Page404 />} />
        <Route
          path="/"
          element={(
            <PrivateRoot>
              <MainPage />
            </PrivateRoot>
          )}
        >
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
