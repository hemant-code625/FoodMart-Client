import './App.css'
import Auth from './pages/Auth'
import Create from './pages/Create'
import Favourites from './pages/Favourites'
import Home from './pages/Home'
import Navbar from './Components/Navbar'
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'


function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <div className='main-box'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/fav' element={<Favourites/>} />
          <Route path='/auth' element={<Auth/>} />
        </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
