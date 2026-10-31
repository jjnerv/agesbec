import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../login"
import { NotificationProvider } from "../../../shared/notifications/NotificationContext";
import { AuthProvider } from "../../../features/auth/context/AuthContext";

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <NotificationProvider>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          </Routes>
        </AuthProvider>
      </NotificationProvider>
    </MemoryRouter>,
  );
}

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("mostra a validação ao clicar no submit", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    expect(
        await screen.findByText("Informe um e-mail válido"),
    ).toBeInTheDocument();
  });

  it("envia os dados quando o formulário é válido", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/E-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/Senha/i), "senha123");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    expect(
        await screen.findByRole("heading", { name: "Dashboard" }),
    ).toBeInTheDocument();    
  });

  it("não envia os dados quando o formulário é inválido", async () => {
    const user = userEvent.setup();
    renderLogin();

    await user.type(screen.getByLabelText(/E-mail/i), "ana@email.com");
    await user.type(screen.getByLabelText(/Senha/i), "senh");
    await user.click(screen.getByRole("button", { name: /Entrar/i }));

    expect(
        await screen.findByRole("heading", { name: "Bem-vindo" }),
    ).toBeInTheDocument();    
  });
});