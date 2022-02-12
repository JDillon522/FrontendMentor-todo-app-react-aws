import Nav from '../../shared/nav/Nav';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from '../../shared/header/Header';

function App() {

  return (
    <>
      <Header />
      <div className='App'>
        <Outlet />
      </div>
    </>
  );
}

export default App;
