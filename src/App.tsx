import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "./store/store";
import { Login } from "./pages/Login";
import { Event } from "./pages/Event";
import ProtectedRoute from "./components/ProtectedRoute";
import { LayoutComponent } from "./components/Layout";

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

function App() {
  return (
    <Provider store={store}>
        <BrowserRouter>
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
