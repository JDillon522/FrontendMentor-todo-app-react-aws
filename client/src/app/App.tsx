import './App.css';
import Header from '../header/Header';
import { RecoilRoot } from 'recoil';
import TodoCard from '../todo-card/TodoCard';
import Yeet from '../yeet/Yeet';

function App() {

  return (
    <RecoilRoot>
      <Yeet />
      <main className='App'>
        <Header />
        <TodoCard />
      </main>
    </RecoilRoot>
  );
}

export default App;
