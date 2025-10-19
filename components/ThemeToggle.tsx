
import React from 'react';

interface ThemeToggleProps {
  theme: string;
  toggleTheme: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      {/* Hidden checkbox to control the state */}
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === 'night'}
      />

      {/* Sun icon (for dark mode) */}
      <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M5.64,17l-1.41,1.41L1,16.82,2.41,15.41,4.23,17.23,5.64,17ZM12,4.5A7.5,7.5,0,0,0,4.5,12a7.5,7.5,0,0,0,7.5,7.5,7.5,7.5,0,0,0,7.5-7.5A7.5,7.5,0,0,0,12,4.5ZM18.36,17l-1.41-1.41,1.41-1.41,1.41,1.41ZM20.59,2.41,19.18,1,17.77,2.41,16.36,1,15,2.41,17,4.23l1.41-1.41L20,5.64l1.41-1.41L23,2.82,21.59,1.41,20.59,2.41ZM23,12h-2a9.47,9.47,0,0,0-.5-2.5,9.47,9.47,0,0,0-.5,2.5H18v2h2.5a9.47,9.47,0,0,0,.5,2.5,9.47,9.47,0,0,0,.5-2.5H23ZM4.23,7.77,2.82,9.18,1.41,7.77,0,9.18,1.41,10.59,0,12l1.41,1.41,1.41-1.41L4.23,13.41,5.64,12,4.23,10.59,5.64,9.18,4.23,7.77ZM9.18,2.82,7.77,1.41,9.18,0l1.41,1.41L9.18,4.23,7.77,2.82ZM12,21.5a9.5,9.5,0,0,1-7.5-7.5H2v2H4.5a9.5,9.5,0,0,1,7.5,7.5,9.5,9.5,0,0,1,7.5-7.5H22v-2H19.5A9.5,9.5,0,0,1,12,21.5Z"/>
      </svg>
      
      {/* Moon icon (for light mode) */}
      <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22,8.27,8.27,0,0,1,15.92,12,8.1,8.1,0,0,1,12.14,19.69Z"/>
      </svg>
    </label>
  );
};

export default ThemeToggle;
