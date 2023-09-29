import { openConnection } from '@helpers/db';
import { isEmailInvalid } from '@helpers/validators';

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let db = null;
  let close = () => {};

  try {
    [db, close] = await openConnection();
  } catch (err) {
    close();
    return res.status(500).json({
      message: 'Something went wront',
    });
  }

  switch (req.method) {
    case 'POST': {
      const { email, name, text } = req.body;

      if (
        isEmailInvalid(email) ||
        !name ||
        name.trim() === '' ||
        !text ||
        text.trim() === ''
      ) {
        return res.status(422).json({
          message: 'Invalid data',
        });
      }

      try {
        const result = await db.collection('comments').insertOne({
          email: email,
          name: name,
          text: text,
          eventId: eventId,
        });

        res.status(201).json({
          message: 'Added comment',
          comment: result,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }
    }
    case 'GET': {
      try {
        const documents = await db
          .collection('comments')
          .find({ eventId: eventId })
          .sort({ _id: -1 })
          .toArray();

        res.status(200).json({
          comments: documents,
        });
      } catch (err) {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }
    }

    close();
  }
}
