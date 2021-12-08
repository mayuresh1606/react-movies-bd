import { Link } from "react-router-dom"
import { BiCameraMovie } from "react-icons/bi"
import {GrClose} from 'react-icons/gr'
import { useGlobalContext } from "./context"

export const Sidebar = () => {
    const {setSidebar, newApi} = useGlobalContext();
    return <aside className="sidebar">
        <div className="sidebar-logo-container">
            <Link to="/" className="head-title" onClick={() => newApi()}><BiCameraMovie className="logo" /><h3 className="sidebar-logo-title logo-title">Movies DB</h3></Link>
            <div className="close-sidebar">
                <GrClose className="close-icon" onClick={() => setSidebar(false)} />
            </div>
        </div>
        <div className="sidebar-links-container">
            <ul className="sidebar-nav-links">
                <Link className="sidebar-links" to="/" onClick={() => newApi()} ><li>Home</li></Link>
                <Link className="sidebar-links" to="/popularity/1"><li >Popularity</li></Link>
                <Link className="sidebar-links" to="/genre/Action/28/1/"><li>Genre</li></Link>
            </ul>
        </div>
    </aside>
}