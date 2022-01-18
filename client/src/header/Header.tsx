import { Component, ReactNode } from "react";
import NewTodoInput from "../new-todo-input/NewTodoInput";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import './Header.css';

export default class Header extends Component {

    render(): ReactNode {
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
}