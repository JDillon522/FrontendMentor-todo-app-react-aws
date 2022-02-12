import Nav from '../../shared/nav/Nav';
import { appLogin } from '../../state/auth.service';
import './Login.css';

export default function Login() {

  const submitLogin = () => {
    appLogin('joseph.dillon.522+1@gmail.com', 'Password123!');
  }

  return (
    <>
      <h1>Login</h1>
      <button onClick={submitLogin}>Login</button>
    </>
  );
}
