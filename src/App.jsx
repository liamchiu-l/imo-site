import { Link, NavLink, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "./sanityClient";
import "./App.css";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        IMO
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
        <p className="eyebrow">Independent Music Organisation</p>

        <h1>Independent Music Organisation</h1>

        <p>
          A student music community for artists, bands, producers, and people
          who care about independent music.
        </p>

        <div className="hero-buttons">
          <Link to="/events" className="button primary-button">
            View Events
          </Link>

          <a href="#contact" className="button secondary-button">
            Get Involved
          </a>
        </div>
      </section>

      <section className="preview-section">
        <div className="preview-card">
          <p className="eyebrow">What We Do</p>
          <h2>Whatever it is we do</h2>
          <p>
            IMO is built around giving musicians a space to perform, meet other
            artists, share work, and create music together.
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