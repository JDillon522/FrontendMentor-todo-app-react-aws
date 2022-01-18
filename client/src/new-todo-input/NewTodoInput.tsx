import { Component, ReactNode } from "react";
import './NewTodoInput.css';

export default class NewTodoInput extends Component {

    render(): ReactNode {
        return (
            <div className="new-todo">
                <div className="check"></div>
                <input placeholder="Create a new todo..." ></input>
            </div>
        )
    }
}
