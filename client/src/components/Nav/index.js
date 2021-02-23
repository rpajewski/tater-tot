import React, { useEffect } from 'react'
import Auth from '../../utils/auth'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo256.png'

function Nav() {
    const location = useLocation()
    const path = location.pathname.match('([^/\d]+)[^/]*$')
    const title = ''

    function heroBannerTitle(pathname) {
        switch(pathname) {
            case 'login':
                return 
            case 'employee':
                return
            default:
                return
        }
    }

    if (path !== null) {
        heroBannerTitle(path[1])
    }

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
                    <li><Link to="/overview/:id" className="navbar-item">Overview</Link></li>
                    <li><Link to="/requestoff:id" className="navbar-item">Request Off</Link></li>
                    <li><Link to="/directory" className="navbar-item">Directory</Link></li>
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
                            <a href="/" className="navbar-item">
                                <img src={logo}></img>
                                <h1>Tater</h1>
                            </a>
                            <span className="navbar-burger" data-target="navbarMenuHeroA">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>

                        <div id="navbarMenuHeroA" className="navbar-menu">
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