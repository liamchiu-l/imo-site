import { Link, NavLink, useLocation } from "react-router-dom";

// Pages with a full-bleed photo hero get the transparent, floating nav.
// Everything else gets the solid bar.
const TRANSPARENT_NAV_ROUTES = ["/", "/events"];

function Navbar() {
  const location = useLocation();
  const isTransparent = TRANSPARENT_NAV_ROUTES.includes(location.pathname);

  return (
    <header className={`navbar ${isTransparent ? "navbar-home" : "navbar-inner"}`}>
      <Link to="/" className="logo">
        <img src="/images/imo-logo-blue.png" alt="IMO logo" />
      </Link>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/events">Events</NavLink>

        <a
          href="https://calendar.google.com/calendar/u/1?cid=YW5kcmV3LmNtdS5lZHVfYzVubTZuYTlicGVzdjFxOWhnYXAwOGpncGNAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ"
          target="_blank"
          rel="noreferrer"
        >
          Calendar
        </a>

        <a href="/#photos">Photos</a>
        <a href="/#blog">Blog</a>
        <NavLink to="/board">Board</NavLink>
        <a href="/#contact">Contact</a>
      </nav>
    </header>
  );
}

export default Navbar;