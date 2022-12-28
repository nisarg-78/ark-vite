import "./App.css";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Error from "./pages/error/Error";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserContext } from "./context/userContext/UserContext";
import { useEffect, useState } from "react";
import Protected from "./components/Protected/Protected";
import AlertPopup from "./components/AlertPopup/AlertPopup";
import axios from "./api/axios";
import { auth } from "./firebase";
import { AlertProvider } from "./context/AlertContext/AlertContext";
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
          <AlertPopup />
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
          <AlertProvider>
            <RouterProvider router={router} />
          </AlertProvider>
        </UserContext.Provider>
      )}

      {/* <Alert
        className="bootstrapAlert position-fixed position-absolute bottom-0 start-50 translate-middle"
        variant={alertType}
        show={alertVisible}
      >
        {alertMsg}
      </Alert> */}
    </div>
  );
}

export default App;