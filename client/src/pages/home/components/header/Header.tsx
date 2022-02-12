import NewTodoInput from "../new-todo-input/NewTodoInput";
import ThemeToggle from "../../../../shared/theme-toggle/ThemeToggle";
import './Header.css';

export default function Header() {

  return (
    <header>
      <div className="row">
        <h1>TODO</h1>
        <ThemeToggle />
      </div>
      <NewTodoInput />
    </header>
  )
}
