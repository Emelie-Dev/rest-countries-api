import React from 'react'
import styles from './Header.module.css'
import ToggleMode from './ToggleMode'

const Header = () => {
  return (
    <header className={styles.header}>
      <h2 className={styles.head}>Where in the world?</h2>

      <ToggleMode />
    </header>
  )
}

export default Header
