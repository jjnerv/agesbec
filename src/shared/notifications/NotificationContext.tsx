import "./notificationContext.scss"
import {
  useCallback,
  useState,
  type ReactNode,
} from "react";
import type {
  Notification,
  NotificationType,
} from "./types/notification.types";
import { NotificationContext } from "./notification-context";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const dismiss = useCallback((id: number) => {
    setNotifications((current) =>
      current.filter((notification) => notification.id !== id),
    );
  }, []);

  const notify = useCallback(
    (type: NotificationType, message: string) => {
      const id = Date.now() + Math.random();
      setNotifications((current) => [...current, { id, type, message }]);
      window.setTimeout(() => dismiss(id), 5000);
    },
    [dismiss],
  );

  return (
    <NotificationContext.Provider value={{ notify, dismiss }}>
      {children}

      <div className="notifications" aria-live="polite">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`notification notification-${notification.type}`}
            role={notification.type === "error" ? "alert" : "status"}
          >
            <span>{notification.message}</span>

            <button
              type="button"
              onClick={() => dismiss(notification.id)}
              aria-label="Fechar notificação"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}