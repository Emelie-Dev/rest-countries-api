import React from 'react'
import styles from './Main.module.css'
import SearchBar from './SearchBar'
import Filter from './Filter'

const Main = () => {
  return (
  <section>

    <div className={styles['search-box']}>

    <SearchBar />

    <Filter />
    
    </div>

  </section>
  )
}

export default Main
