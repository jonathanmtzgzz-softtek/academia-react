import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path='/login' element={<Login mail={''}></Login>} />
            <Route path='/signup' element={<Signup></Signup>} />
            <Route
              path='/homepage'
              element={
                <ProtectedRoute>
                  <HomePage></HomePage>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
