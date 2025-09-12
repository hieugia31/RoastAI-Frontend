import LoginPage from "./page/LoginPage";
import SignupPage from "./page/SignupPage";
import HomePage from "./page/HomePage";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"

function App() {

  return (
    <div className="min-h-screen flex flex-col bg-[#fff] text-[#313131]">
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App
