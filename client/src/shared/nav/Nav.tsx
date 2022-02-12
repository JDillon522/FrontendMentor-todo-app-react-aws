import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import './Nav.css';

export default function Nav() {
  const isActiveLink = (opts: { isActive: boolean }) => {
    return opts.isActive ? 'active btn': 'btn';
  };

  return (
    <nav>
      <NavLink to="/" className={isActiveLink}>Home</NavLink>
      <NavLink to="/auth/login" className={isActiveLink}>Login</NavLink>
      <ThemeToggle />
    </nav>
  )
}
