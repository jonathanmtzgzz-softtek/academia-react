import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Login from './components/Login';
import { AuthProvider } from './hooks/useAuth';
import Signup from './components/Signup';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path='/login'
              element={
                <Login
                  mail={'usuario-leer-borrar-escribir@softtek.com'}
                ></Login>
              }
            />
            <Route path='/signup' element={<Signup></Signup>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
