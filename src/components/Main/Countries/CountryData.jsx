import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './CountryData.module.css';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Button from '../Button/Button';
import data from '../../../../public/data.json';
import { ModeContext } from '../../../App'

const CountryData = () => {
  const [loading, setLoading] = useState(true);
  const [imgLoad, setImgLoad] = useState(true);
  const [timeLimit, setTimeLimit] = useState(false);
  const [countryData, setCountryData] = useState({});
  const [countries, setCountries] = useState([]);
  const [ darkMode, setDarkMode ] = useContext(ModeContext);
  const { country } = useParams();
  const navigate = useNavigate();

  let {
    name,
    flags,
    population,
    region,
    subregion,
    capital,
    tld,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = countryData;

  population = [...String(population)];

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

  if (capital) {
    if (Array.isArray(capital)) {
      capital = capital.join(', ');
    }
  } else {
    capital = 'N/A';
  }

  const domain = tld || topLevelDomain;

  const currencyValues = () => {
    if (Array.isArray(currencies)) {
      let entry = currencies;
      let currencyNames = entry.map((currency) => currency.name).join(', ');

      return currencyNames;
    } else if (typeof currencies === 'object') {
      let entry = Object.entries(currencies);
      let currencyNames = entry.map((currency) => currency[1].name).join(', ');

      return currencyNames;
    }
  };

  const languageValues = () => {
    if (Array.isArray(languages)) {
      let languageNames = languages.map((language) => language.name).join(', ');
      return languageNames;
    } else if (typeof languages === 'object') {
      let languageNames = [];

      for (let language in languages) {
        languageNames.push(languages[language]);
      }

      return languageNames.join(', ');
    }
  };

  const borderValues = () => {
    let borderNames = [];

    if (borders) {
      for (let country of countries) {
        const name = country.name.common || country.name;

        const code = country.cca3 || country.alpha3Code;

        borders.includes(code) && borderNames.push(name);
      }
    }
    return borderNames.sort();
  };

  const nativeName = () => {
    const countryObj = data.find((obj) => obj.name.toLowerCase() === country);

    return countryObj ? countryObj.nativeName : name.common;
  };

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(`https://restcountries.com/v3.1/all`);

        setCountries(data);
        setCountryData(
          data.find((obj) => obj.name.common.toLowerCase() === country)
        );
        setLoading(false);
      } catch (err) {
        setCountries(data);
        setCountryData(data.find((obj) => obj.name.toLowerCase() === country));
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const loadTime = setTimeout(() => {
      if (loading === false) {
        setTimeLimit(true);
      }
    }, 5000);

    return () => {
      clearTimeout(loadTime);
    };
  }, [loading]);

  return (
    <main className={styles.main}>
      <button className={`${styles.button} ${darkMode ? styles['dark-button'] : ''}`} onClick={() => navigate('/')}>
        <HiOutlineArrowNarrowLeft className={styles.arrow} />
        Back
      </button>

      {loading ? (
        <span className={`${styles.loader} ${darkMode ? styles.dark : ''}`}></span>
      ) : (
        <article className={styles.article}>
          <figure className={styles.figure}>
            {imgLoad && (
              <span
                className={`${styles['img-loader']} ${
                  timeLimit ? styles['hide-content'] : ''
                } ${darkMode ? styles['dark-loader'] : ''}`}
              ></span>
            )}

            {timeLimit && (
              <div
                className={`${styles.fallback} ${
                  imgLoad === false ? styles['hide-content'] : ''
                } ${darkMode ? styles.dark : ''}`}
              >
                Couldn&#39;t load image. Connect to the internet and reload the page to view the
                image and latest details.
              </div>
            )}

            <img
              src={flags.png}
              className={`${styles.img} ${imgLoad ? styles['hide-img'] : ''}`}
              onLoad={() => setImgLoad(false)}
            />
          </figure>
          <section className={`${styles.details} ${darkMode ? styles.dark : ''}`}>
            <h1 className={`${styles['details-head']} ${darkMode ? styles.dark : ''}`}>{name.common || name}</h1>

            <div className={styles['details-list-box']}>
              <ul
                className={`${styles['details-list']}  ${styles['first-list']}`}
              >
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>
                    Native Name:
                  </span>
                  &nbsp;
                  <span className={styles['details-value']}>
                    {nativeName()}
                  </span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>
                    Population:
                  </span>
                  &nbsp;
                  <span className={styles['details-value']}>
                    {realPopulation}
                  </span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>Region:</span>
                  &nbsp;
                  <span className={styles['details-value']}>{region}</span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>
                    Sub Region:
                  </span>
                  &nbsp;
                  <span className={styles['details-value']}>{subregion}</span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>Capital:</span>
                  &nbsp;
                  <span className={styles['details-value']}>{capital}</span>
                </li>
              </ul>

              <ul className={`${styles['details-list']} second-list`}>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>
                    Top Level Domain:
                  </span>
                  &nbsp;
                  <span className={styles['details-value']}>
                    {domain.join(', ')}
                  </span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>
                    Currencies:
                  </span>
                  &nbsp;
                  <span className={styles['details-value']}>
                    {currencyValues()}
                  </span>
                </li>
                <li className={styles['details-item']}>
                  <span className={styles['details-property']}>Languages:</span>
                  &nbsp;
                  <span className={styles['details-value']}>
                    {languageValues()}
                  </span>
                </li>
              </ul>
            </div>

            <div className={styles['details-border']}>
              <span className={styles['details-property']}>
                Border Countries:
              </span>
              <div className={styles['details-border-button']}>
                {borderValues().length !== 0 ? (
                  borderValues().map((border, index) => (
                    <Button
                      key={index}
                      text={border}
                      link={`/country/${border.toLowerCase()}`}
                    />
                  ))
                ) : (
                  <span className={styles['no-border']}>None</span>
                )}
              </div>
            </div>
          </section>
        </article>
      )}
    </main>
  );
};

export default CountryData;
