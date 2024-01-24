import React, { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Countries from './components/Main/Countries/Countries';
import CountryData from './components/Main/Countries/CountryData';
import styles from './App.module.css';

export const ModeContext = React.createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mode = localStorage.getItem('mode');
    
    if(mode === 'true') {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('mode', `${darkMode}`);

    if (darkMode) {
      document.body.classList.add(styles.dark);
    } else {
      document.body.classList.remove(styles.dark);
    }
  }, [darkMode]);

  return (
    <>
      <ModeContext.Provider value={[darkMode, setDarkMode]}>
        <Header />

        <Routes>
          <Route path="/" element={<Countries />} exact/>
          <Route path="/country/:country" element={<CountryData />} exact/>
        </Routes>
      </ModeContext.Provider>
    </>
  );
}

export default App;
