import React, { useContext, useRef, useState } from 'react';
import styles from './SearchBar.module.css';
import { MdOutlineSearch } from 'react-icons/md';
import { CountryContext } from '../Countries/Countries';
import { ModeContext } from '../../../App';

const SearchBar = () => {
  const [countries, setCountries, fixedCountries] = useContext(CountryContext);
  const [darkMode, setDarkMode] = useContext(ModeContext);

  const searchRef = useRef();

  const searchCountry = (e) => {
    const searchValue = String(searchRef.current.value).trim();

    const inputData = String(e.nativeEvent.data);

    setCountries(
      fixedCountries.filter((country) => {
        const name =
          country.name.common.toLowerCase() || country.name.toLowerCase();

        return name.startsWith(String(searchValue));
      })
    );
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`${darkMode ? styles.dark : ''}`}
    >
      <span className={styles['icon-box']}>
        <MdOutlineSearch
          size={24}
          className={`${styles['search-icon']} ${darkMode ? styles.dark : ''}`}
        />
      </span>
      <input
        type="text"
        className={`${styles['search-bar']} ${darkMode ? styles.dark : ''}`}
        placeholder="Search for a country..."
        ref={searchRef}
        onInput={searchCountry}
      />
    </form>
  );
};

export default SearchBar;
