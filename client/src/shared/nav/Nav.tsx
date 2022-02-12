import { Link } from 'react-router-dom';
import './Nav.css';

export default function Nav() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </nav>
  )
}
