import { Link } from "react-router-dom";
import "../style.css"

function Header (){
    return(
        <div className="header">
            <nav className="navbar">
                <ul className="nav-links">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/People">People</Link>    
                </ul>
            </nav>     
        </div> 
    )
}

export default Header;