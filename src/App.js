import { Login } from 'components/Login';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, useNavigate, Route, Routes } from 'react-router-dom';
import { Tracker } from './pages/Tracker';
import { getAuth } from 'firebase/auth';
import { auth } from 'config/firebase';

function App() {
  const { dark } = useSelector((state) => state.ui);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (dark) body.classList.add('dark');
    else body.classList.remove('dark');
  }, [dark]);

  return (
    <div id='print' className={dark ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Tracker />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/login' element={authenticated ? <Navigate to='/' /> : <Login />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
