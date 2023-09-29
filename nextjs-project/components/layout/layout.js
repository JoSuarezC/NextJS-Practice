import MainHeader from 'components/layout/main-header';
import { Fragment, useContext } from 'react';
import Notification from '@components/ui/notification';
import NotificationContext from 'store/notification-context';

function Layout(props) {
  const context = useContext(NotificationContext);
  const notification = context.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {notification && (
        <Notification
          title={notification.title}
          message={notification.message}
          status={notification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
