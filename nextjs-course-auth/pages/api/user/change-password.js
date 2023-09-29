import { getSession } from 'next-auth/client';
import { hashPassword, verifyPassword } from '../../../helpers/auth';
import { openConnection } from '../../../helpers/db';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    return onPATCH(req, res);
  }
}

async function onPATCH(req, res) {
  const session = await getSession({
    req: req,
  });

  if (!session) {
    return res.status(401).json({
      message: 'Not Authenticated',
    });
  }

  const userEmail = session.user.email;
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || newPassword.trim().length < 7) {
    return res.status(422).json({
      message: 'Invalid input',
    });
  }

  const client = await openConnection();
  const db = client.db();

  const existingUser = await db
    .collection('users')
    .findOne({ email: userEmail });

  if (!existingUser) {
    client.close();
    return res.status(404).json({
      message: 'User not found.',
    });
  }

  const isValid = await verifyPassword(oldPassword, existingUser.password);

  if (!isValid) {
    client.close();
    return res.status(422).json({
      message: 'Invalid password.',
    });
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = db.collection('users').updateOne(
    { email: userEmail },
    {
      $set: {
        password: hashedPassword,
      },
    }
  );

  client.close();
  return res.status(200).json({
    message: 'Updated User',
    result: result,
  });
}
