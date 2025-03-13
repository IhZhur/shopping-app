import React, { useEffect } from "react";
import "../styles/ToastNotification.css";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const ToastNotification: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Уведомление исчезает через 3 секунды

    return () => clearTimeout(timer);
  }, [onClose]);

  return <div className="toast">{message}</div>;
};

export default ToastNotification;
