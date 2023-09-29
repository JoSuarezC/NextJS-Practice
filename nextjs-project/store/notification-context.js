import { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({ children }) {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (
      notification &&
      (notification.status === 'success' || notification.status === 'error')
    ) {
      const timer = setTimeout(hideNotification, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  function showNotification(notificationData) {
    setNotification({
      title: notificationData.title,
      message: notificationData.message,
      status: notificationData.status,
    });
  }

  function hideNotification() {
    setNotification(null);
  }

  const context = {
    notification: notification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
