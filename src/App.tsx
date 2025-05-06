import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { Login } from "./pages/Login";
import { Event } from "./pages/Event";
import ProtectedRoute from "./components/ProtectedRoute";
import { LayoutComponent } from "./components/Layout";
import { useEffect } from "react";
import { initializeAuth } from "./store/auth/authSlice";


const HomeRedirect = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return isAuthenticated ? (
    <Navigate to="/event" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

const AppInitializer = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return null
}


function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <AppInitializer />
      <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/event"
              element={
                <ProtectedRoute>
                  <Event />
                </ProtectedRoute>
              }
            />
          </Routes>
      </LayoutComponent>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
