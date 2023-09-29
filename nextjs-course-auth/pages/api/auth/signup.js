import { hashPassword } from '../../../helpers/auth';
import { openConnection } from '../../../helpers/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return onPOST(req, res);
  }
}

async function onPOST(req, res) {
  const { email, password } = req.body;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    return res.status(422).json({
      message: 'Invalid input',
    });
  }

  const client = await openConnection();
  const db = client.db();

  const existingUser = await db
    .collection('users')
    .findOne({ email: email });

  if (existingUser) {
    client.close();
    return res.status(422).json({
      message: 'Email already registered',
    });
  }
  
  const hashedPassword = await hashPassword(password);
  const result = db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });

  client.close();
  return res.status(201).json({
    message: 'Created User',
    result: result,
  });
}
