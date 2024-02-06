import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import ByLocation from './components/ByLocation'

function App() {


  return (
    <div className='bg-[#023047]'>
      <NavBar />
      {/* <SearchBar /> */}
      <ByLocation />
    </div>
  )
}

export default App
