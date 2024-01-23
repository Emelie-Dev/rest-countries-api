import React, { useContext } from 'react';
import styles from './ToogleMode.module.css';
import { ModeContext } from '../../App';
import { LuSun } from 'react-icons/lu';

const ToggleMode = () => {
  const [darkMode, setDarkMode] = useContext(ModeContext);

  return (
    <div className={styles.mode} onClick={() => setDarkMode(!darkMode)}>
      {darkMode ? (
        <span className={styles['icon-box']}>
          <LuSun className={styles.icon} />
        </span>
      ) : (
        <span className={styles['icon-box']}>
          <svg
            className={styles.icon}
            viewBox="0 0 24 24"
            strokeWidth="1.7"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
            />
          </svg>
        </span>
      )}

      <span className={styles['mode-type']}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </span>
    </div>
  );
};

export default ToggleMode;
