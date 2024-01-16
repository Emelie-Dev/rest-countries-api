import React from 'react'
import styles from './SearchBar.module.css'
import { MdOutlineSearch } from "react-icons/md"

const SearchBar = () => {

   

  return (
   
    <form  onSubmit={e => e.preventDefault()}>

        <span className={styles['icon-box']}>

    <MdOutlineSearch size={24} className={styles['search-icon']} />

        </span>
        <input type='text' className={styles['search-bar']} placeholder='Search for a country...' />
    </form>

  )
}

export default SearchBar
