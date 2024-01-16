import React from 'react';
import styles from './CountryCard.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const CountryCard = ({ country }) => {
  const navigate = useNavigate();

  let { population, region, capital, flags, name } = country;

  population = [...String(population)];

  capital = capital ? capital : 'N/A';

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
      className={styles.article}
      onClick={() => navigate(`/country/${countryName.toLowerCase()}`)}
    >
      <figure className={styles.figure}>
        <img src={flags.png} className={styles.img} />
        <figcaption className={styles.caption}>{countryName}</figcaption>
      </figure>

      <p className={styles.info}>
        <span className={styles['info-box']}>
          <span className={styles['info-title']}>Population:&nbsp;</span>
          <span className={styles['info-value']}>{realPopulation}</span>
        </span>
        <span className={styles['info-box']}>
          <span className={styles['info-title']}>Region:&nbsp;</span>
          <span className={styles['info-value']}>{region}</span>
        </span>
        <span className={styles['info-box']}>
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
