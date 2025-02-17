import React from 'react'
// allows us to link to different pages with the nav bar
import {Link} from "react-router-dom"
 
// Contains the HTML for the nav bar component.
function Navbar(){
    return(
        <nav>
            <h1><Link to="/">ParentAidATX</Link></h1>

            <ul>
                <li>
                    <Link to="/programs">Government Programs</Link>
                </li>
                <li>
                    <Link to="/housing">Housing</Link>
                </li>
                <li>
                    <Link to="/childcare">Childcare</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </nav>
    );
}
export default Navbar;