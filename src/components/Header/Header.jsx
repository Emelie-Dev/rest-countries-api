import React, { useContext } from 'react';
import styles from './Header.module.css';
import ToggleMode from './ToggleMode';
import { ModeContext } from '../../App';

const Header = () => {
  const [darkMode, setDarkMode] = useContext(ModeContext);

  return (
    <header className={`${styles.header} ${darkMode ? styles.dark : ''}`}>
      <h2 className={styles.head}>Where in the world?</h2>

      <ToggleMode />
    </header>
  );
};

export default Header;
