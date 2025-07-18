import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useSelector } from 'react-redux';
import LoginPage from './Components/LoginPage';
import Page404 from './Components/Page404';
import MainPage from './Components/MainPage';
import RegistrationPage from './Components/RegistrationPage';
import { store } from './Slices/index.jsx'

const PrivateRoot = ({ children }) => {
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  
  return (
    loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
