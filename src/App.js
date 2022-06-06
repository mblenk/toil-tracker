//styles
import './App.css';
//react modules
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
//pages
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import UserContent from './pages/user_content/UserContent';
import Profile from './pages/profile/Profile';
import History from './pages/history/History';
import Sidebar from './components/Sidebar';
import Personalise from './pages/personalise/Personalise';


//components
import Navbar from './components/Navbar'
//hooks
import { useAuthContext } from './hooks/useAuthContext'


function App() {
  const { authIsReady, user } = useAuthContext()
    
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
            <div className="container">
              {!user &&  <Navbar />}
              <Routes>
                {!user && <Route path='/' element={<Home />} />}  
                {user && <Route path='/' element={<Navigate to='/user_content' />} />}
                {!user && <Route path='/login' element={<Login />} />}
                {user && <Route path='/login' element={<Navigate to='/' />} />}
                {!user && <Route path='/signup' element={<Signup />} />}
                {user && <Route path='/signup' element={<Navigate to='/' />} />}
                {!user && <Route path='/user_content' element={<Navigate to='/' />} />}  
                {user && <Route path='/user_content' element={<UserContent />} />}
                {!user && <Route path='/profile' element={<Navigate to='/' />} />}  
                {user && <Route path='/profile' element={<Profile />} />}
                {!user && <Route path='/history' element={<Navigate to='/' />} />}  
                {user && <Route path='/history' element={<History />} />}
                {!user && <Route path='/personalise' element={<Navigate to='/' />} />}  
                {user && <Route path='/personalise' element={<Personalise />} />}
              </Routes>
            </div>        
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
