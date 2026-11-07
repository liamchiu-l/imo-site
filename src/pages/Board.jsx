import { useEffect, useState } from "react";

import { client } from "../sanityClient";

function Board() {
  const [execMembers, setExecMembers] = useState([]);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "execMember"]
        | order(order asc) {
          name,
          role,
          "photoUrl": photo.asset->url
        }`
      )
      .then(setExecMembers)
      .catch(console.error);
  }, []);

  return (
    <main>
      {/* Reuses the Events hero so both pages share one look */}
      <section className="events-page-hero">
        <div className="events-hero-content">
          <p className="hero-kicker">Meet the Team</p>
          <h1 className="events-title">Board</h1>
          <p className="events-subtitle">
            Names and faces of the people keeping IMO running.
          </p>
        </div>
      </section>

      <section className="events-section events-section-torn">
        <div className="section">
          {execMembers.length === 0 ? (
            <p className="empty-message">No exec members added yet.</p>
          ) : (
            <div className="exec-grid">
              {execMembers.map((member) => (
                <article
                  className="exec-card"
                  key={`${member.name}-${member.role}`}
                >
                  <div className="exec-photo-wrap">
                    {member.photoUrl ? (
                      <img
                        className="exec-photo"
                        src={member.photoUrl}
                        alt={member.name}
                      />
                    ) : (
                      <div className="exec-photo-placeholder" />
                    )}
                  </div>

                  <h2>{member.name}</h2>
                  <p className="exec-role">{member.role}</p>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Part of the page flow: sits at the bottom and scrolls with it */}
        <img src="/images/torn-page-2.png" alt="" className="page-torn-bottom" />
      </section>
    </main>
  );
}

export default Board;