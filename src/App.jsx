import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";
import { client } from "./sanityClient";
import "./App.css";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);

      if (target) {
        setTimeout(() => {
          target.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location]);

  return null;
}

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
        <a href="/#contact">Contact</a>
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
            <span>Organization</span>
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

      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2>Contact</h2>

          <div className="contact-grid">
            <div>
             <p className="contact-label">General</p>
             <a href="mailto:independentmusiciansorg@gmail.com">independentmusiciansorg@gmail.com</a>
            </div>
         </div>
       </div>
      </section>

      <footer className="site-footer">
        <div className="footer-links">
          <a href="https://www.instagram.com/cmuimo" target="_blank" rel="noreferrer">
            <FaInstagram />
          </a>
          <a href="https://discord.gg/XWX2M4jB" target="_blank" rel="noreferrer">
            <FaDiscord />
         </a>
         <a href="https://www.youtube.com/@CMUIMO" target="_blank" rel="noreferrer">
           <FaYoutube />
          </a>
          <a
            href="https://tartanconnect.cmu.edu/imo/home/"
            target="_blank"
            rel="noreferrer"
            aria-label="Tartan Connect"
          >
            <img
              className="tartan-connect-img"
              src="/images/TartanConnect.png"
              alt=""
            />
          </a>
        </div>

         <p>Independent Music Organization</p>
      </footer>
    </main>
  );
}

function EventCard({ event }) {
  return (
    <article className="event-row">
      <div className="event-row-date">
        <span>{event.date}</span>
        {event.time && <span>{event.time}</span>}
      </div>

      <div className="event-row-main">
        <h3>{event.title}</h3>
        {event.description && <p>{event.description}</p>}
      </div>

      {event.location && (
        <p className="event-row-location">{event.location}</p>
      )}

      {event.link ? (
        <a
          className="event-row-button"
          href={event.link}
          target="_blank"
          rel="noreferrer"
        >
          Tickets or more info or something
        </a>
      ) : (
        <span className="event-row-placeholder">TBA</span>
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
      
      <ScrollToHash />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
      </Routes>
    </div>
  );
}

export default App;