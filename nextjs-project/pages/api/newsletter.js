import { openConnection } from '@helpers/db';
import { isEmailInvalid } from '@helpers/validators';


export default async function handler(req, res) {
  switch (req.method) {
    case 'POST': {
      const email = req.body.email;

      if (isEmailInvalid(email)) {
        return res.status(422).json({
          message: 'Invalid Email',
        });
      }

      let db = null;
      let close = () => {};
      
      try {
        [db, close] = await openConnection();
        const result = await db.collection('emails').insertOne({
          email: email,
        });
  
        res.status(201).json({
          message: 'Email Registered',
          email: result,
        });
      } catch(err) {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }

      close();
    }
  }
}
