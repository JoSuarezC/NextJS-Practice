import { useContext } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from 'store/notification-context';

function NewsletterRegistration() {
  const context = useContext(NotificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    const email = event.target.email.value;

    if (!email || !email.includes('@')) {
      return;
    }

    context.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }
      
      context.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
    } catch(err) {
      context.showNotification({
        title: 'Error!',
        message: err.message || 'Something went wrong.',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
