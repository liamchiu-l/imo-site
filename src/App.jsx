import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <img src="/images/imo-logo.png" alt="IMO logo" />
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>
        <a href="#photos">Photos</a>
        <a href="#blog">Blog</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}

function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <p className="eyebrow">CMU's</p>

          <h1 className="hero-title">
            <span>Independent Music</span>
            <span>Organisation</span>
          </h1>

          <p>Johnny tell me what to put here please.</p>

          <div className="hero-buttons">
            <Link to="/events" className="button primary-button">
              View Events
            </Link>

            <a href="#contact" className="button secondary-button">
              Join the Lineup!
            </a>
          </div>
        </div>
      </section>

      <section className="info-section">
        <div className="info-content">
          <h2>Whatever it is we do</h2>
          <p>
            IMO does music stuff at CMU or smth, but I don't really know
            cause I'm not a part of it.
          </p>
        </div>
      </section>
    </main>
  );
}

function EventCard({ event }) {
  return (
    <article className="event-card">
      <p className="event-date">
        {event.date} {event.time ? `· ${event.time}` : ""}
      </p>

      <h3>{event.title}</h3>

      {event.location && <p className="event-location">{event.location}</p>}

      {event.description && <p>{event.description}</p>}

      {event.link && (
        <a
          className="event-link"
          href={event.link}
          target="_blank"
          rel="noreferrer"
        >
          More Info
        </a>
      )}
    </article>
  );
}

function Events() {
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
    <main>
      <section className="page-hero">
        <p className="eyebrow">Upcoming Shows</p>
        <h1>Events</h1>
        <p>
          Shows, jam sessions, club meetings, listening parties, and other IMO
          events.
        </p>
      </section>

      <section className="section">
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
  );
}

function App() {
  return (
    <div className="site">
      <div className="background-glow"></div>

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;