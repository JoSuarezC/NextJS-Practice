import { NotificationData } from '@app-types/notification';
import classes from './notification.module.css';
import { createPortal } from 'react-dom';

function Notification(props: NotificationData) {
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  const cssClasses = `${classes.notification} ${statusClasses}`;

  return createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notificationPortal')!,
  );
}

export default Notification;
