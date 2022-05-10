import { Login } from "components/Login";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Tracker } from "./pages/Tracker";

function App() {
  const { dark } = useSelector((state) => state.ui);
  const { authenticated } = useSelector((state) => state.ui);
  // const isAuthenticated = !!sessionStorage.getItem("Auth Token");

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (dark) body.classList.add("dark");
    else body.classList.remove("dark");
  }, [dark]);

  return (
    <div id='print' className={dark ? "dark" : ""}>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={authenticated ? <Tracker /> : <Navigate to='/login' />}
          />
          <Route
            path='/login'
            element={authenticated ? <Navigate to='/' /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
