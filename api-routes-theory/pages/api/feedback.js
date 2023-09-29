import fs from 'fs/promises';
import path from 'path';

export async function getFeedbackData() {
  const filePath = path.join(process.cwd(), 'data', 'feedback.json');
  const fileData = await fs.readFile(filePath);
  return JSON.parse(fileData);
}
export default async function handler(req, res) {
  const data = await getFeedbackData();

  if (req.method === 'POST') {
    const email = req.body.email;
    const feedback = req.body.feedback;

    const newFeedback = {
      id: new Date().toISOString(),
      email: email,
      feedback: feedback,
    };

    data.push(newFeedback);
    await fs.writeFile(filePath, JSON.stringify(data));
    res.status(201).json({
      message: 'Success!',
      feedback: newFeedback,
    });
  } else if (req.method === 'GET') {
    res.status(200).json({
      feedback: data,
    });
  }
}
