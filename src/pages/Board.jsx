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
      <section className="page-hero exec-hero">
        <p className="eyebrow">IMO</p>
        <h1>Board</h1>
        <p>Who is running the show or something</p>
      </section>

      <section className="exec-section">
        {execMembers.length === 0 ? (
          <p className="empty-message">No exec members added yet.</p>
        ) : (
          <div className="exec-grid">
            {execMembers.map((member) => (
              <article className="exec-card" key={`${member.name}-${member.role}`}>
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
      </section>
    </main>
  );
}

export default Board;