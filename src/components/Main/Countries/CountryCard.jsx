import React, { useContext, useEffect, useState } from 'react';
import styles from './CountryCard.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ModeContext } from '../../../App'

const CountryCard = ({ country }) => {
  const [loading, setLoading] = useState(true);

  const [timeLimit, setTimeLimit] = useState(false);

  const [darkMode, setDarkMode] = useContext(ModeContext);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTime = setTimeout(() => {
      if (loading) {
        setTimeLimit(true);
      }
    }, 5000);

    return () => {
      clearTimeout(loadTime);
    };
  }, [loading]);

  
  let { population, region, capital, flags, name } = country;

  population = [...String(population)];

  if(capital) {

  if(Array.isArray(capital)) {

    capital =  capital.join(', ');

  } 

} else {

  capital ='N/A';

}

  const countryName = name.common || name;

  let realPopulation;

  if (population.length <= 3) {
    realPopulation = population.join('');
  } else {
    for (let i = population.length - 1; i >= 0; i -= 3) {
      if (i === population.length - 1) continue;
      population[i] = `${population[i]},`;
    }

    realPopulation = population.join('');
  }

  return (
    <article
      className={`${styles.article} ${darkMode ? styles.dark : ''}`}
      onClick={() => navigate(`/country/${countryName.toLowerCase()}`)}
    >
      {loading && (
        <span
          className={`${styles.loader} ${
            timeLimit ? styles['hide-content'] : ''
          } ${darkMode ? styles['dark-loader'] : ''}`}
        ></span>
      )}

      {timeLimit && (
        <div
          className={`${styles.fallback} ${
            loading === false ? styles['hide-content'] : ''
          }`}
        >
          Couldn&#39;t load image. Connect to the internet and reload the page to view the image and
          latest details.
        </div>
      )}

      <figure className={styles.figure}>
        <img
          src={flags.png}
          className={`${styles.img} ${
            loading === false ? styles['img-load'] : ''
          }`} alt={`${countryName}'s flag`}
          onLoad={() => setLoading(false)}
        />
        <figcaption className={styles.caption}>{countryName}</figcaption>
      </figure>

      <p className={styles.info}>
        <span className={`${styles['info-box']} ${darkMode ? styles['dark-box'] : ''}`}>
          <span className={styles['info-title']}>Population:&nbsp;</span>
          <span className={styles['info-value']}>{realPopulation}</span>
        </span>
        <span className={`${styles['info-box']} ${darkMode ? styles['dark-box'] : ''}`}>
          <span className={styles['info-title']}>Region:&nbsp;</span>
          <span className={styles['info-value']}>{region}</span>
        </span>
        <span className={`${styles['info-box']} ${darkMode ? styles['dark-box'] : ''}`}>
          <span className={styles['info-title']}>Capital:&nbsp;</span>
          <span className={styles['info-value']}>{capital}</span>
        </span>
      </p>
    </article>
  );
};

CountryCard.propTypes = {
  country: PropTypes.object,
};

export default CountryCard;
