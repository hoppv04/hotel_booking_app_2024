import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import AddHotel from "./pages/AddHotel";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import MyHotel from "./pages/MyHotel";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <p>Home Page</p>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />

        {isLoggedIn && (
          <>
            <Route
              path="/add-hotel"
              element={
                <Layout>
                  <AddHotel />
                </Layout>
              }
            />
          </>
        )}

        {isLoggedIn && (
          <>
            <Route
              path="/my-hotels"
              element={
                <Layout>
                  <MyHotel />
                </Layout>
              }
            />
          </>
        )}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
