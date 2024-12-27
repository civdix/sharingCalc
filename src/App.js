import "./App.css";
import Calc from "./components/Calc.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./components/home.jsx";
import Login from "./components/login.jsx";
// import TelegramAPi from "./components/telegramAPi.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUp from "./components/signUp.jsx";
import ShareHistory from "./components/ShareHistory.jsx";
import Analytics from "./components/Analytics.jsx";
import CalcState from "./components/calcContext/calcState.js";
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
            <Navbar /> <Login />{" "}
          </>
        ),
      },
      ,
      {
        path: "/signUp",
        element: (
          <>
            {" "}
            <Navbar />
            <SignUp />{" "}
          </>
        ),
      },
      {
        path: "/ShareHistory",
        element: (
          <>
            {" "}
            <Navbar />
            <ShareHistory />{" "}
          </>
        ),
      },
      {
        path: "/Analytics",
        element: (
          <>
            {" "}
            <Navbar />
            <Analytics />{" "}
          </>
        ),
      },
      {
        path: "/account",
        element: (
          <>
            {" "}
            <Navbar />
            <div>This is DashBoard or analytics</div>{" "}
          </>
        ),
      },
      {
        path: "/Calc",
        element: (
          <>
            {" "}
            <Navbar />
            <Calc />{" "}
          </>
        ),
      },
    ]);

    return (<CalcState>
      <RouterProvider router={router} />;
    </CalcState>);
  } catch (e) {
    console.error("Error:", e);
  }
}

export default App;
