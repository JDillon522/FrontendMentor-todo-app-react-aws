import NewTodoInput from './components/new-todo-input/NewTodoInput';
import TodoCard from './components/todo-card/TodoCard';
import './Home.css';

export default function Home() {

  return (
    <>
      <h2 className='title'>HOME</h2>
      <NewTodoInput />
      <TodoCard />
    </>
  )
}
