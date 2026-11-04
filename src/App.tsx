import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard"
import './App.css';
import 'normalize.css';
import { RequireAuth } from "./shared/routing/RequireAuth";
import AverbacaoPage from "./pages/averbacao/AverbacaoPage";

export function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/averbacao" element={<AverbacaoPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default App
