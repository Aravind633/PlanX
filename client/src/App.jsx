import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register"; // You can create this similar to Login
import Dashboard from "./pages/Dashboard"; // Rename your old App.jsx to Dashboard.jsx
import { GlobalProvider } from "./context/globalContext";

function App() {
  const isAuthenticated = !!sessionStorage.getItem("token");

  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
          />
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
