import { useState } from 'react';
import { signIn } from 'next-auth/client';
import classes from './auth-form.module.css';
import { useRouter } from 'next/router';

async function createUser(email, password) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const formValues = event.target;

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: formValues.email.value,
        password: formValues.password.value,
      });

      if (!result.error) {
        router.replace('/profile');
      }

      console.log(result);
    } else {
      const result = await createUser(formValues.email.value, formValues.password.value);
      console.log('result', result);

      if (!result.error) {
        switchAuthModeHandler();
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={onSubmit}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            name='email'
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            name='password'
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
