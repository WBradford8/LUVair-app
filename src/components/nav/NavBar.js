import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <>
        <div className="wholeNavBar">
        <img src={require("./LUVairLogo.png").default} alt="LUVair Logo" className="navbar" />
        
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/Posts">Shared Flights</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/userProfile">My Hours</Link>
            </li>
            <li className="navbar__item active">
            <Link className="logout" to="#"
							onClick={
								() => {
									localStorage.removeItem("luvair_user")
								}
							}
						>Logout</Link>

            </li>

        </ul>
        </div>
        </>
    )
}
