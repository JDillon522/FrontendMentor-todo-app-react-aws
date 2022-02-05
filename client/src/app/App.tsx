import './App.css';
import Header from '../header/Header';
import { RecoilRoot } from 'recoil';
import TodoCard from '../todo-card/TodoCard';
import Yeet from '../yeet/Yeet';
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {

  return (
    <RecoilRoot>
      <Yeet />
      <div className='App'>
        <Header />
        <DndProvider backend={HTML5Backend}>
          <TodoCard />
        </DndProvider>
      </div>
    </RecoilRoot>
  );
}

export default App;
