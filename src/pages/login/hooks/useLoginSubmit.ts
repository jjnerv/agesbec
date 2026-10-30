import { useNavigate } from "react-router-dom";
import type { FieldErrors } from "react-hook-form";
import { useNotifications } from "../../../shared/notifications/hooks/useNotifications";
import type { LoginFormData } from "../schemas/login.schema";
import { useAuth } from "../../../features/auth/context/useAuth";
import { getFirstValidationError } from "../utils/getFirstValidationError";

export function useLoginSubmit() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const { notify } = useNotifications();

  async function onSubmit() {
      setIsAuthenticated(true);
      navigate("/dashboard", { replace: true });      
  }

  function onInvalid(errors: FieldErrors<LoginFormData>) {
    notify("error", getFirstValidationError(errors));
  }

  return { onSubmit, onInvalid };
}