import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Auth from '../../utils/auth'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/images/logo256.png'

function Nav() {
    const state = useSelector(state => state)
    const { employee } = state
    const employeeId = employee._id

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
                    <li><a href={`/overview/${employeeId}`} className="navbar-item">Overview</a></li>
                    <li><a href={`/requestoff/${employeeId}`} className="navbar-item">Request Off</a></li>
                    <li><a href={`/directory/${employeeId}`} className="navbar-item">Directory</a></li>
                </ul>
            )
        } else {
            return (
                <ul>
                    <li><a href="/signup/employee" className="navbar-item">Sign Up</a></li>
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