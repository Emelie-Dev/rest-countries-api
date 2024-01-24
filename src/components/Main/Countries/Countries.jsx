import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import CountryCard from './CountryCard';
import styles from './Countries.module.css';
import data from '../../../data.json';
import FilterSearchPanel from '../FilterSearchPanel/FilterSearchPanel';
import { FaArrowUp } from 'react-icons/fa';
import { ModeContext } from '../../../App';

export const CountryContext = React.createContext();

const Countries = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [darkMode, setDarkMode] = useContext(ModeContext);

  // Add resize handler

  const matchWidth = () => {
    let gridNumber = 0;

    if (window.matchMedia('(min-width: 1000px)').matches) {
      gridNumber = 4;
    } else if (window.matchMedia('(min-width: 800px)').matches) {
      gridNumber = 3;
    } else if (window.matchMedia('(min-width: 550px)').matches) {
      gridNumber = 2;
    } else {
      gridNumber = 1;
    }

    return gridNumber;
  };

  let fixedCountriesRef = useRef([]);

  const topArrowVisibility = () => {
    const top = document.documentElement.scrollTop;
    if (top > 400) {
      setShowTopArrow(true);
    } else {
      setShowTopArrow(false);
    }
  };

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get('https://restcountries.com/v3.1/all');

        data = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(data);
        fixedCountriesRef.current = data;
        setLoading(false);
      } catch (err) {
        const countriesData = data.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countriesData);
        fixedCountriesRef.current = data;
        setLoading(false);
      }
    })();

    window.addEventListener('scroll', topArrowVisibility);

    return () => {
      window.removeEventListener('scroll', topArrowVisibility);
    };
  }, []);

  return (
    <main>
      <CountryContext.Provider
        value={[countries, setCountries, fixedCountriesRef.current]}
      >
        <FilterSearchPanel />
      </CountryContext.Provider>

      <span
        title="Move to the top"
        className={` ${styles['top-arrow-box']} ${
          showTopArrow ? styles['show-top-arrow-box'] : ''
        } ${darkMode ? styles['dark-arrow-box'] : ''}`}
        onClick={scrollToTop}
      >
        <FaArrowUp
          className={`${styles['top-arrow']} ${
            darkMode ? styles['dark-arrow'] : ''
          }`}
        />
      </span>

      {loading ? (
        <div
          className={`${styles.loader} ${darkMode ? styles.dark : ''}`}
        ></div>
      ) : (
        <div
          className={`${styles.main} ${
            countries.length < matchWidth() ? styles['main-select'] : ''
          }`}
        >
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      )}
    </main>
  );
};

export default Countries;
