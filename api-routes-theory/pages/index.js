import { useState } from "react";

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const feedback = event.target.feedback.value;

    await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        feedback: feedback,
      })
    });
  }

  async function loadFeedbackHandler() {
    const response = await fetch('/api/feedback');
    const data = await response.json();
    setFeedbackItems(data.feedback);
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email Address
          </label>
          <input type="email" id="email" name="email"/>
        </div>
        <div>
          <label htmlFor="feedback">
            Feedback
          </label>
          <textarea id="feedback" rows="5" name="feedback"></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr/>
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {
          feedbackItems.map(item => {
            return (
              <li key={item.id}>
                {item.email} | {item.feedback}
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

export default HomePage;
