import "./assets/styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./components/Header";
import Topup from "./pages/Topup";
import Transaction from "./pages/Transaction";
import Akun from "./pages/Akun";
import ProtectedRoute from "./routes/PrivateRoutes";
import PublicRoute from "./routes/PublicRoutes";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Pembayaran from "./pages/Pembayaran";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <Routes>
              <Route path="*" element={<h1>404 Page Not Found</h1>} />

              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Home />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/akun"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Akun />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/topup"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Topup />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/transaction"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Transaction />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/pembayaran"
                element={
                  <ProtectedRoute>
                    <Header />
                    <Pembayaran />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
