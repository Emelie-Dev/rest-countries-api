import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './Button.module.css';
import { ModeContext } from '../../../App'

const Button = ({ text, link }) => {
  const [ darkMode, setDarkMode ] = useContext(ModeContext);
  const navigate = useNavigate();


  return (
    <a href={link}>
    <button className={`${styles.button} ${darkMode ? styles['dark-button'] : ''}`}>
      {text}
    </button>
    </a>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string,
};

export default Button;
