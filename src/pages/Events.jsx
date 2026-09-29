import { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaClock, FaArrowRight } from "react-icons/fa";

import { client } from "../sanityClient";
import { getDateParts } from "../utils/formatDate";

function FeaturedEvent({ event }) {
  const { month, day, year } = getDateParts(event.date);

  return (
    <div className="featured-event">
      <span className="featured-badge">Featured</span>

      <div className="featured-event-date">
        <span className="month">{month}</span>
        <span className="day">{day}</span>
        <span className="year">{year}</span>
      </div>

      <div className="featured-event-info">
        <h2>{event.title}</h2>
        {event.description && <p>{event.description}</p>}

        <div className="featured-event-meta">
          {event.location && (
            <span>
              <FaMapMarkerAlt aria-hidden="true" />
              {event.location}
            </span>
          )}
          {event.time && (
            <span>
              <FaClock aria-hidden="true" />
              {event.time}
            </span>
          )}
        </div>
      </div>

      {event.link && (
        <a
          className="featured-event-button"
          href={event.link}
          target="_blank"
          rel="noreferrer"
        >
          Tickets
          <FaArrowRight aria-hidden="true" />
        </a>
      )}

      <div className="featured-event-accent" aria-hidden="true" />
    </div>
  );
}

function EventListRow({ event }) {
  const { month, day, year } = getDateParts(event.date);

  return (
    <article className="event-list-row">
      <div className="event-list-date">
        <span className="month">{month}</span>
        <span className="day">{day}</span>
        <span className="year">{year}</span>
      </div>

      <div className="event-list-main">
        <h3>{event.title}</h3>
        {event.description && <p>{event.description}</p>}
      </div>

      <div className="event-list-meta">
        {event.location && (
          <span>
            <FaMapMarkerAlt aria-hidden="true" />
            {event.location}
          </span>
        )}

        {event.time && (
          <span>
            <FaClock aria-hidden="true" />
            {event.time}
          </span>
        )}
      </div>

      {event.link && (
        <a
          className="event-list-link"
          href={event.link}
          target="_blank"
          rel="noreferrer"
          aria-label={`View ${event.title}`}
        >
          <FaArrowRight aria-hidden="true" />
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
        `*[
          _type == "event" &&
          date >= string::split(now(), "T")[0]
        ]
        | order(date asc) {
          title,
          date,
          time,
          location,
          description,
          link
        }`
      )
      .then((data) => {
        // Sort client-side too — don't rely solely on Sanity's order(),
        // since date fields stored as strings can sort unexpectedly
        // depending on format/timezone quirks in the CMS.
        const sorted = [...data].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sorted);
      })
      .catch(console.error);
  }, []);

  const [featuredEvent, ...restEvents] = events;

  return (
    <main>
      <section className="events-page-hero">
        <div className="events-hero-content">
          <p className="hero-kicker">Upcoming Shows</p>
          <h1 className="events-title">Events</h1>
          <p className="events-subtitle">
            Upcoming IMO events such as shows and jam sessions.
          </p>
        </div>
      </section>

      <section className="events-section">
        <div className="section">
          {events.length === 0 ? (
            <p className="empty-message">No upcoming events yet.</p>
          ) : (
            <>
              <FeaturedEvent event={featuredEvent} />

              {restEvents.length > 0 && (
                <div className="event-list">
                  {restEvents.map((event) => (
                    <EventListRow
                      key={`${event.title}-${event.date}`}
                      event={event}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <img src="/images/torn-page-2.png" alt="" className="page-torn-fixed" />
    </main>
  );
}

export default Events;