import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../state/atoms';
import './ThemeToggle.css';


export default function ThemeToggle() {
  const [state, setItems] = useRecoilState(todoState);

  const updateTheme = () => {
    setItems({
      ...state,
      theme: state.theme === 'light' ? 'dark' : 'light'
    });
  }

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--current-background-color', `var(--background-color-${state.theme})`);
    root.setProperty('--current-background-banner', `var(--background-banner-${state.theme})`);
    root.setProperty('--current-card-background-color', `var(--card-background-color-${state.theme})`);
    root.setProperty('--current-subdued', `var(--subdued-gray-${state.theme})`);
    root.setProperty('--current-disabled-text', `var(--disabled-text-${state.theme})`);
    root.setProperty('--current-box-shadow', `var(--box-shadow-${state.theme})`);
    root.setProperty('--current-primary-font-color', `var(--primary-font-color-${state.theme})`);
  }, [state.theme]);

  return (
    <button onClick={updateTheme}>
      <img
        src={state.theme === 'light' ? 'images/icon-moon.svg' : 'images/icon-sun.svg'}
        alt="ThemeToggle"
        title="Toggle Theme"/>
    </button>
  );

}
