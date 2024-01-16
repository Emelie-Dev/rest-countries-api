import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CountryCard from './CountryCard';
import styles from './Countries.module.css';
import data from '../../../../public/data.json';

const Countries = () => {
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get('https://restcountries.com/v3.1/all');

        data = data.sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(data);
        setLoading(false);
      } catch (err) {
        const countriesData = data.sort((a, b) => a.name.localeCompare(b.name));

        setCountries(countriesData);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className={styles.main}>
      {loading === false
        ? countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))
        : 'Loading'}
    </main>
  );
};

export default Countries;
