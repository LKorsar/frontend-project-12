import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Components/LoginPage';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import RegistrationPage from './Components/RegistrationPage';
import AuthContext from './contexts/context';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoot = ({ children }) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  console.log(auth.loggedIn);

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {

  return (
    <AuthProvider>
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
    </AuthProvider>
  )
};

export default App;
