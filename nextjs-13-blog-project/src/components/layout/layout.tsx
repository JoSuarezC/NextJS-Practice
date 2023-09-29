'use client';
import { useContext } from 'react';
import dynamic from 'next/dynamic';

import Navigation from './navigation';
import NotificationContext from '@context/notification';

const DynamicNotification = dynamic(
  () => import('../ui/notification'),
  {
    ssr: false,
  }
);

export function Layout({ children }: { children: React.ReactNode }) {
  const context = useContext(NotificationContext);
  const notification = context.notification;

  return (
    <>
      <Navigation />
      <main>
        {children}
        {notification && (
          <DynamicNotification
            title={notification.title}
            message={notification.message}
            status={notification.status}
          />
        )}
      </main>
    </>
  );
}
