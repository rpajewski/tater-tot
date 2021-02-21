import React from 'react'
import Auth from '../../utils/auth'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo256.png'
import 'bulma'

function Nav() {

    function topNav() {
        if (Auth.loggedIn()) {
            return (
            <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                    <a href="/" className="navbar-item">
                        Home
                    </a>
                    <span className="navbar-item">
                        <a href="/"  className="button is-primary is-inverted" onClick={() => Auth.logout()}>
                            <span className="icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </span>
                            <span>Logout</span>
                        </a>
                    </span>
                </div>
            </div>
            )
        } else {
            return (
            <div id="navbarMenuHeroA" className="navbar-menu">
                <div className="navbar-end">
                    <a href="/" className="navbar-item">
                        Home
                    </a>
                    <span className="navbar-item">
                        <Link to="/login" className="button is-primary is-inverted">
                                <span className="icon">
                                    <i className="fas fa-sign-in-alt"></i>
                                </span>
                                <span>Sign In</span>
                        </Link>
                    </span>
                </div>
            </div>
            )
        }
    }

    function bottomNav() {
        if (Auth.loggedIn()) {
            return (
                <div className="hero-foot">
                    <nav className="tabs">
                        <div className="container">
                            <ul>
                                <li><Link to="/overview/:id" className="navbar-item">Overview</Link></li>
                                <li><Link to="/requestoff" className="navbar-item">Request Off</Link></li>
                                <li><Link to="/directory" className="navbar-item">Directory</Link></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            )
        } else {
            return (
            <div className="hero-foot">
                <nav className="tabs">
                    <div className="container">
                        <ul>
                            <li><Link to="/signup/employee" className="navbar-item">Sign Up</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
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
                        {topNav()}
                    </div>
                </nav>
            </div>

            <div className="hero-body">
                <div className="container has-text-centered">
                    <p className="title">Tater</p>
                    <p className="subtitle">The Time Off Tracker</p>
                </div>
            </div>

            {bottomNav()}
        </header>
    )
}

export default Nav