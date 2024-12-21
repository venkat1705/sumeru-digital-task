import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Auth from "./components/Auth";
import Chat from "./components/chat/Chat";
import HomePage from "./components/HomePage";
import Loader from "./components/Loader";
import { useAuthStore } from "./store/authStore";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={authUser ? <Navigate to="/chat" /> : <Auth />}
        />

        <Route
          path="/chat"
          element={authUser ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/chat/:id"
          element={authUser ? <Chat /> : <Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
