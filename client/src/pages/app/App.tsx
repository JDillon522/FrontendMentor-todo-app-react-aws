import { RecoilRoot } from 'recoil';
import Nav from '../../shared/nav/Nav';
import Yeet from '../../yeet/Yeet';
import Header from './components/header/Header';
import TodoCard from './components/todo-card/TodoCard';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <Nav />
      <Outlet />
    </div>
  );
}

export default App;
