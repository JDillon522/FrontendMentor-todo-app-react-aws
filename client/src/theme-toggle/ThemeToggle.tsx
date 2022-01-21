import './ThemeToggle.css';

export interface ThemeToggleState {
  theme: 'dark' | 'light';
}

export default function ThemeToggle() {

  return (
    <button>
      <img src="images/icon-moon.svg" alt="ThemeToggle" />
    </button>
  );

}
