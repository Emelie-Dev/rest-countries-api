import React from 'react'
import styles from './Filter.module.css'

const Filter = () => {
  return (
   
    <select className={styles.select} >
        <option value='region'>Filter by Region</option>
        <option value='africa'>Africa</option>
        <option value='america'>America</option>
        <option value='asia'>Asia</option>
        <option value='europe'>Europe</option>
        <option value='oceania'>Oceania</option>
    </select>
  )
}

export default Filter
