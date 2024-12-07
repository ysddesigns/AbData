import ToastNotification from "@/components/toastNotification/Toastt";
import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState({ visible: false, message: "" });

  const showToast = (message: string) => {
    setToast({ visible: true, message });
    setTimeout(() => setToast({ visible: false, message: "" }), 3000);
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <ToastNotification visible={toast.visible} message={toast.message} />
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
