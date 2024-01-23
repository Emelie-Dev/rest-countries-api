import React, { useContext, useRef } from 'react';
import styles from './Filter.module.css';
import { CountryContext } from '../Countries/Countries';
import { ModeContext } from '../../../App';

const Filter = () => {
  const [countries, setCountries, fixedCountries] = useContext(CountryContext);
  const [darkMode, setDarkMode] = useContext(ModeContext);

  const filterCountries = (e) => {
    const region = e.target.value;

    if (region === 'all') {
      setCountries(fixedCountries);
      return;
    }

    setCountries(
      fixedCountries.filter(
        (country) => country.region.toLowerCase() === region
      )
    );
  };

  return (
    <select className={`${styles.select} ${darkMode ? styles.dark : ''}`} onChange={filterCountries}>
      <option value="all">Filter by Region</option>
      <option value="africa">Africa</option>
      <option value="americas">America</option>
      <option value="asia">Asia</option>
      <option value="europe">Europe</option>
      <option value="oceania">Oceania</option>
    </select>
  );
};

export default Filter;
