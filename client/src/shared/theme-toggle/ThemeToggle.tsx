import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState, todoState } from '../../state/atoms';
import './ThemeToggle.css';


export default function ThemeToggle() {
  const [state, setItems] = useRecoilState(authState);

  const updateTheme = () => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setItems({
      ...state,
      theme: newTheme
    });
  }

  useEffect(() => {
    const root = document.documentElement.style;
    root.setProperty('--current-background-color', `var(--background-color-${state.theme})`);
    root.setProperty('--current-background-banner', `var(--background-banner-${state.theme})`);
    root.setProperty('--current-background-mobile-banner', `var(--background-banner-mobile-${state.theme})`);
    root.setProperty('--current-card-background-color', `var(--card-background-color-${state.theme})`);
    root.setProperty('--current-subdued', `var(--subdued-gray-${state.theme})`);
    root.setProperty('--current-disabled-text', `var(--disabled-text-${state.theme})`);
    root.setProperty('--current-box-shadow', `var(--box-shadow-${state.theme})`);
    root.setProperty('--current-primary-font-color', `var(--primary-font-color-${state.theme})`);
    root.setProperty('--current-background-header', `var(--background-header-${state.theme})`);
    root.setProperty('--current-warn-font-color', `var(--warn-font-color-${state.theme})`);
  }, [state.theme]);

  return (
    <button onClick={updateTheme}>
      {
        state.theme === 'light' ?
        <img src="/images/icon-moon.svg" alt="ThemeToggle" title="Toggle Theme"/> :
        <img src="/images/icon-sun.svg" alt="ThemeToggle" title="Toggle Theme"/>
      }
    </button>
  );

}
