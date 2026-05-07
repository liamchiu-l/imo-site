import {useEffect, useState} from "react";
import {client} from "./sanityClient";
import "./App.css";

function EventCard({event}) {
  return (
    <article className="event-card">
      <p className="event-date">
        {event.date} {event.time ? `· ${event.time}` : ""}
      </p>

      <h3>{event.title}</h3>

      {event.location && <p className="event-location">{event.location}</p>}

      {event.description && <p>{event.description}</p>}

      {event.link && (
        <a className="event-link" href={event.link} target="_blank">
          More Info
        </a>
      )}
    </article>
  );
}

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "event"] | order(date asc) {
          title,
          date,
          time,
          location,
          description,
          link
        }`
      )
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  return (
    <div className="site">
      <header className="navbar">
        <div className="logo">IMO</div>

        <nav>
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#photos">Photos</a>
          <a href="#blog">Blog</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1>Independent Music Organisation</h1>
          <p>
            A student music community for artists, bands, producers, and people
            who care about independent music.
          </p>
        </section>

        <section id="events" className="section">
          <div className="section-heading">
            <p className="eyebrow">Upcoming Shows</p>
            <h2>Events</h2>
          </div>

          {events.length === 0 ? (
            <p className="empty-message">No upcoming events yet.</p>
          ) : (
            <div className="event-grid">
              {events.map((event) => (
                <EventCard key={event.title + event.date} event={event} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;