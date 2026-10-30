import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard"
import './App.css';
import 'normalize.css';
import { RequireAuth } from "./shared/routing/RequireAuth";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App
