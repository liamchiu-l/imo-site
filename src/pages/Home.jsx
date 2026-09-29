import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaInstagram, FaDiscord, FaYoutube } from "react-icons/fa";

import { client } from "../sanityClient";
import { formatEventDate } from "../utils/formatDate";

function Home() {
  const [nextEvent, setNextEvent] = useState(null);

  useEffect(() => {
    client
      .fetch(
        `*[
          _type == "event" &&
          date >= string::split(now(), "T")[0]
        ]
        | order(date asc)[0] {
          title,
          date,
          time,
          location,
          description,
          link
        }`
      )
      .then(setNextEvent)
      .catch(console.error);
  }, []);

  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <p className="hero-kicker">Carnegie Mellon University</p>

          <h1 className="hero-title">
            <span>Independent</span>
            <span>Music</span>
            <span>Organization</span>
          </h1>

          <div className="hero-buttons">
            <Link to="/events" className="button primary-button">
              Upcoming Shows
            </Link>

            <a
              href="https://tartanconnect.cmu.edu/imo/club_signup"
              className="hero-text-link"
              target="_blank"
              rel="noreferrer"
            >
              Get Involved
              <span>→</span>
            </a>
          </div>
        </div>

        {nextEvent && (
          <div className="hero-showbar">
            <img
              className="showbar-thumb"
              src="/images/show-placeholder.jpg"
              alt="Concert crowd"
            />

            <div className="showbar-info">
              <p className="showbar-label">Next Show</p>

              <div className="showbar-mainline">
                <span className="showbar-date">
                  {formatEventDate(nextEvent.date)}
                </span>

                {nextEvent.title && (
                  <>
                    <span className="showbar-dot">•</span>
                    <span className="showbar-location">{nextEvent.title}</span>
                  </>
                )}
              </div>
            </div>

            {nextEvent.link ? (
              <a
                href={nextEvent.link}
                target="_blank"
                rel="noreferrer"
                className="showbar-link"
              >
                Get Tickets →
              </a>
            ) : (
              <Link to="/events" className="showbar-link">
                View Event →
              </Link>
            )}
          </div>
        )}

        <img src="/images/torn-page.png" alt="" className="hero-torn-edge" />
      </section>

      <section className="info-section">
        <div className="info-content">
          <h2>Whatever it is we do</h2>
          <p>IMO does music stuff at CMU. Monke like music.</p>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-content">
          <h2>Contact</h2>

          <div className="contact-grid">
            <div>
              <p className="contact-label">General</p>
              <a href="mailto:independentmusiciansorg@gmail.com">
                independentmusiciansorg@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-links">
          <a
            href="https://www.instagram.com/cmuimo"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          <a
            href="https://discord.gg/XWX2M4jB"
            target="_blank"
            rel="noreferrer"
            aria-label="Discord"
          >
            <FaDiscord />
          </a>

          <a
            href="https://www.youtube.com/@CMUIMO"
            target="_blank"
            rel="noreferrer"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>

          <a
            href="https://tartanconnect.cmu.edu/imo/home/"
            target="_blank"
            rel="noreferrer"
            aria-label="Tartan Connect"
          >
            <img className="tartan-connect-img" src="/images/TartanConnect.png" alt="" />
          </a>
        </div>

        <p>Independent Music Organization</p>
      </footer>
    </main>
  );
}

export default Home;