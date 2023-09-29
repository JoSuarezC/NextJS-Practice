import { getFeedbackData } from "./feedback";

export default async function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const data = await getFeedbackData();
  const feedback = data.find(item => item.id === feedbackId);
  res.status(200).json({
    feedback: feedback,
  });
}
