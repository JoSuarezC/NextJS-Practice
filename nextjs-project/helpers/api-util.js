export const FIREBASE_URL = 'https://nextjscourse-1a193-default-rtdb.firebaseio.com/events.json';

export async function getAllEvents() {
  const response = await fetch(FIREBASE_URL);
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      ...data[key],
      id: key,
    });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}