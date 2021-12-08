import {BiCameraMovie} from "react-icons/bi"
import {BsSearch} from 'react-icons/bs'
import { useGlobalContext } from "./context"
import { Link } from "react-router-dom"
import {GiHamburgerMenu} from 'react-icons/gi'


export const Navbar = () => {
    const {value, setValue, sidebar, setSidebar, newApi} = useGlobalContext();
    
    
    return <nav className={`${sidebar?'side-bar nav':'nav'}`}>
        <div onClick={() => setSidebar(true)} className="sidebar-btn">
            <GiHamburgerMenu className="ham" />
        </div>
        <div className="logo-container">
            <Link onClick={() => newApi()} to="/"><BiCameraMovie className="logo" /></Link>
            <h3 className="logo-title">Movies DB</h3>
        </div>
        <form action="/" onSubmit={(e) => {
            e.preventDefault();
            newApi();
            }} className="search-bar-form">
            <input onChange={(e) => setValue(e.target.value)} value={value} type="text" className="search-bar" name="search-bar" id="search" />
            <Link to="/"><button type="submit" className='btn-w-o-back'><BsSearch type="submit" className="search-icon" /></button></Link>
        </form>
        <div className="links-container">
            <ul className="nav-links">
                <Link key={'home'} onClick={() => newApi()} className="links" to="/"><li>Home</li></Link>
                <Link key="popularity" className="links" to="/popularity/1"><li>Popularity</li></Link>
                <Link key="Genre" className="links" to="/genre/Action/28/1"><li>Genre</li></Link>
            </ul>
        </div>
    </nav>
}