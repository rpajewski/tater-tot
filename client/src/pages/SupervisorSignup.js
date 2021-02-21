import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import Auth from '../utils/auth'
import { ADD_EMPLOYEE } from '../utils/mutations'

function SupervisorSignup(props) {

    return (
    <section className="box">
        <div className="field">
            <label className="label">First Name:</label>
            <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" placeholder="e.g John"></input>
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div className="field">
            <label className="label">Last Name:</label>
            <div className="control has-icons-left has-icons-right">
                <input className="input" type="text" placeholder="e.g Smith"></input>
                <span className="icon is-small is-left">
                    <i className="fas fa-user"></i>
                </span>
            </div>
        </div>

        <div className="field">
            <label className="label">Phone Number:</label>
            <p className="control has-icons-left has-icons-right">
                <input className="input" type="tel" placeholder="Phone"></input>
                <span className="icon is-small is-left">
                    <i className="fas fa-phone"></i>
                </span>
            </p>
        </div>

        <div className="field">
            <label className="label">Email:</label>
            <p className="control has-icons-left has-icons-right">
                <input className="input" type="email" placeholder="Email"></input>
                <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                </span>
            </p>
        </div>

        <div className="field">
            <label className="label">Password:</label>
            <p className="control has-icons-left has-icons-right">
                <input className="input" type="password" placeholder="Password"></input>
                <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                </span>
            </p>
        </div>

        <div className="field">
            <p className="control">
                <a className="button is-primary">Submit</a>
            </p>
        </div>
    </section>
    )
}

export default SupervisorSignup