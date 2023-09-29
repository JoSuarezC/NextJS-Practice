import { useRouter } from 'next/router';
import classes from './profile-form.module.css';

function ProfileForm() {
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    const formValues = event.target;

    const response = await fetch('/api/user/change-password/', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newPassword: formValues['new-password'].value,
        oldPassword: formValues['old-password'].value,
      }),
    });

    const data = await response.json();
    console.log('data', data);

    if (!response.ok) {
      console.log('Error');
    } else {
      router.push('/');
    }
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' name='new-password'/>
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password' name='old-password'/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
