import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState, todoState } from '../../state/atoms';
import { appLogout } from '../../state/auth.service';
import ThemeToggle from '../theme-toggle/ThemeToggle';
import './Nav.css';

export default function Nav() {
  const [todo_state, todo_setItems] = useRecoilState(todoState);
  const [auth_state, auth_setItems] = useRecoilState(authState);

  const navigate = useNavigate();

  const isActiveLink = (opts: { isActive: boolean }) => {
    return opts.isActive ? 'active btn': 'btn';
  };

  const submitLogout = async () => {
    await appLogout();
    auth_setItems({
      ...auth_state,
      isLoggedIn: false
    });

    todo_setItems({
      ...todo_state,
      items: [],
      filteredItems: []
    });
    navigate('/auth/login');
  }

  return (
    <nav>
      {
        auth_state.isLoggedIn ?
        <NavLink to="/" className={isActiveLink}>Home</NavLink> :
        <NavLink to="/auth/register" className={isActiveLink}>Register</NavLink>
      }
      {
        auth_state.isLoggedIn ?
        <button onClick={submitLogout}>Logout</button> :
        <NavLink to="/auth/login" className={isActiveLink}>Login</NavLink>
      }
      <ThemeToggle />
    </nav>
  )
}
