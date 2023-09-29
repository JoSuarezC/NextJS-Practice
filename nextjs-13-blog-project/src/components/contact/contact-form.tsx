'use client';
import { FormEvent, useContext } from 'react';
import NotificationContext from '@context/notification';
import classes from './contact-form.module.css';
import { ContactBody, ContactResponse } from '@app-types/api-contact';

type FormValues = {
  email: {value: string},
  name: {value: string},
  message: {value: string},
};

export default function ContactForm() {
  const context = useContext(NotificationContext);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formValues = event.target as typeof event.target & FormValues;

    const body: ContactBody = {
      email: formValues.email.value,
      name: formValues.name.value,
      message: formValues.message.value,
    };
    
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body) ,
      });

      if (!response.ok) {
        const data = await response.json() as ContactResponse;
        return context.showNotification({
          'title': 'Error!',
          'message': data.message,
          'status': 'error',
        });
      }

      const data = await response.json();

      return context.showNotification({
        'title': 'Success!',
        'message': data.message,
        'status': 'success',
      });
    } catch(err: any) {
      return context.showNotification({
        'title': 'Error!',
        'message': err.message || 'Something went wrong. Please try again later',
        'status': 'error',
      });
    }
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form
        className={classes.form}
        onSubmit={onSubmit}
      >
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input
              id='email'
              name='email'
              type='email'
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Name</label>
            <input
              id='name'
              name='name'
              type='text'
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Message</label>
          <textarea
            name='message'
            id='message'
            rows={5}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}
