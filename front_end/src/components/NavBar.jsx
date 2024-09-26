import {Link} from "react-router-dom"
import './NavBar.css'

function NavBar(){
  return (
    <>
      <div>
        <nav>
          <ul>
            <li><Link to="/" className="navbar-link">Home</Link></li>
            <li><Link to="/profile" className="navbar-link">Profile</Link></li>
            <li><Link to="/profile" className="navbar-link">Profile</Link></li>
          </ul>
        </nav>
      </div>
    </>
)


}

export default NavBar
