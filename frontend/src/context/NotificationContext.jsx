import { createContext, useContext, useRef, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState(null);
  const timer = useRef(null);

  const showNotification = (message, type = "success") => {
    clearTimeout(timer.current);
    setNotification({ message, type });
    timer.current = setTimeout(() => setNotification(null), 4000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <div role="alert" className={`fixed right-4 top-4 z-[100] flex max-w-sm items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-xl ${notification.type === "error" ? "bg-red-600" : "bg-emerald-600"}`}>
          <span>{notification.message}</span>
          <button type="button" aria-label="Close notification" className="ml-2 text-lg leading-none opacity-80 hover:opacity-100" onClick={() => setNotification(null)}>×</button>
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  return useContext(NotificationContext);
}
