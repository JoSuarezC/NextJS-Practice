import { useState } from "react";
import { getFeedbackData } from "../api/feedback";

export default function FeedbackPage({ feedbackItems }) {
  const [feedbackData, setFeedbackData] = useState(null);

  async function showDetailsHandler(id) {
    const response = await fetch('/api/' + id);
    const feedbackRes = await response.json();
    setFeedbackData(feedbackRes.feedback);
  }
  return (
    <>
      <ul>
        {
          feedbackItems.map(item => {
            return (
              <li key={item.id}>
                {item.email}
                <button onClick={() => showDetailsHandler(item.id)}>Show Details</button>
              </li>
            );
          })
        }
      </ul>
      {
        feedbackData && (
          <p> {feedbackData.feedback} </p>
        )
      }
    </>
  )
}

export async function getStaticProps() {
  // Calling your API here won't work. Call helper methods instead. HTTP req is not neccesary
  //const response = await fetch('/api/feedback');
  const data = await getFeedbackData();

  return {
    props: {
      feedbackItems: data,
    },
    revalidate: 100,
  };
}
