
import './App.css';
import Calc from './components/Calc.jsx';
import Navbar from './components/Navbar.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
 import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from './components/signUp.jsx';


function App() {
  try {
    const router = createBrowserRouter([
      {
        path: "/",
        element: (
          <>
            {" "}
            <Navbar /> <Home />
          </>
        ),
      },
      {
        path: "/about",
        element: (
          <>
            {" "}
            <Navbar /> <div>This is about</div>{" "}
          </>
        ),
      },
      {
        path: "/logIn",
        element: (
          <>
            {" "}
            <Navbar /> <Login/>{" "}
          </>
        ),
      },
      ,
      {
        path: "/signUp",
        element: (
          <>
            {" "}
            <Navbar /><SignUp/>{" "}
          </>
        ),
      },
      {
        path: "/account",
        element: (
          <>
            {" "}
            <Navbar /><div>This is DashBoard or analytics</div>{" "}
          </>
        ),
      },
      {
        path: "/Calc",
        element: (
          <>
            {" "}
            <Navbar /><Calc/>{" "}
          </>
        ),
      },
    ]);

    return (
        <RouterProvider router={router} />
    );
  } catch (e) {
    console.error("Error:", e);
  }
 
}

export default App;
