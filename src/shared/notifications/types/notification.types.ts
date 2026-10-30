export type NotificationType = "success" | "error" | "info";

export type Notification = {
  id: number;
  type: NotificationType;
  message: string;
};

export type NotificationContextValue = {
  notify: (type: NotificationType, message: string) => void;
  dismiss: (id: number) => void;
};