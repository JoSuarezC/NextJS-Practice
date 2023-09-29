'use client';
import { NotificationData } from '@app-types/notification';
import React, { createContext, useEffect, useState } from 'react';

type ContextData = {
  notification: NotificationData | null,
  showNotification: (notificationData: NotificationData) => void,
  hideNotification: () => void
}

const NotificationContext = createContext<ContextData>({
  notification: null,
  showNotification: (notificationData: NotificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider({ children }: {children: JSX.Element}) {
  const [notification, setNotification] = useState<NotificationData | null>(null);

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

  function showNotification(notificationData: NotificationData) {
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
