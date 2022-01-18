import { Component } from "react";
import './ThemeToggle.css';

export interface ThemeToggleState {
    theme: 'dark'|'light';
}

export default class ThemeToggle extends Component {
    constructor(props: any) {
        super(props);
        this.state = {
            theme: 'light'
        }
    }

    render() {
        return (
            <button>
                <img src="images/icon-moon.svg" alt="ThemeToggle" />
            </button>
        );
    }
}
