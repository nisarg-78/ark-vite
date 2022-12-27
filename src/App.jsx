import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Error from "./pages/error/Error";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./context/userContext/UserContext";
import { useEffect, useState } from "react";
import Protected from "./components/Protected/Protected";
import axios from "./api/axios";
import { auth } from "./firebase";

function App() {
  const [user, setUser] = useState({ firebaseUser: null, apiUser: null });
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/auth/islogged");
        const apiUser = res.data;

        if (apiUser) {
          setUser((prev) => {
            return { ...prev, apiUser };
          });
          axios.defaults.headers.common = {
            Authorization: `Bearer ${apiUser.accessToken}`,
          };
        }

        auth.onAuthStateChanged(function (firebaseUser) {
          setUser((prev) => {
            return { ...prev, firebaseUser };
          });
          setVerifying(false);
        });
      } catch (error) {
        setVerifying(false);
        console.log(error);
      }
    })();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protected isSignedIn={Boolean(user.firebaseUser && user.apiUser)}>
          <Home />
        </Protected>
      ),
      errorElement: <Error />,
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
  ]);

  return (
    <div className="App min-vh-100" style={{ backgroundColor: "#343a40  " }}>
      {verifying ? (
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          Please Wait{" "}
        </div>
      ) : (
        <UserContext.Provider value={{ user, setUser }}>
          <RouterProvider router={router} />
        </UserContext.Provider>
      )}
    </div>
  );
}

export default App;
