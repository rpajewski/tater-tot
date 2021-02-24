import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Auth from '../../utils/auth'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo256.png'

function Nav() {
    const state = useSelector(state => state)
    const { employee } = state
    const employeeId = employee._id

    const [isActive, setisActive] = useState(false)

    const location = useLocation()
    const path = location.pathname.match('([^/\]+)[^/]*$')

    function topNav() {
        if (Auth.loggedIn()) {
            return (
                <a href="/"  className="button is-primary is-inverted" onClick={() => Auth.logout()}>
                    <span className="icon">
                        <i className="fas fa-sign-out-alt"></i>
                    </span>
                    <span>Logout</span>
                </a>
            )
        } else {
            return (
                <Link to="/login" className="button is-primary is-inverted">
                    <span className="icon">
                        <i className="fas fa-sign-in-alt"></i>
                    </span>
                    <span>Sign In</span>
                </Link>
            )
        }
    }

    function bottomNav() {
        if (Auth.loggedIn()) {
            return (
                <ul>
                    <li><Link to={`/overview/${employeeId}`} className="navbar-item">Overview</Link></li>
                    <li><Link to={`/requestoff/${employeeId}`} className="navbar-item">Request Off</Link></li>
                    <li><Link to={`/directory/${employeeId}`} className="navbar-item">Directory</Link></li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li><Link to="/signup/employee" className="navbar-item">Sign Up</Link></li>
                </ul>
            )
        }
    }
    
    return (
        <header className="hero is-primary is-medium">
            <div className="hero-head">
                <nav className="navbar">
                    <div className="container">
                        <div className="navbar-brand">
                            <Link to="/" className="navbar-item">
                                <img src={logo}></img>
                                <h1 className="title">Tater</h1>
                            </Link>
                        </div>

                        <a onClick={() => { setisActive(!isActive) }}
                        role="button" 
                        className={`navbar-burger ${isActive ? 'is-active' : ''}`} 
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbarMenuHeroA">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </a>

                        <div id="navbarMenuHeroA" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                            <div className="navbar-end">
                                <a href="/" className="navbar-item">
                                    Home
                                </a>
                                <span className="navbar-item">
                                    {topNav()}
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">Tater</p>
                    <p className="subtitle">The Time Off Tracker</p>
                </div>
            </div>

            <div className="hero-foot">
                <nav className="tabs">
                    <div className="container">
                        {bottomNav()}
                    </div>
                </nav>
            </div>

        </header>
    )
}

export default Nav