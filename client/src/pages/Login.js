import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import Auth from '../utils/auth'
import { LOGIN } from '../utils/mutations'
import 'bulma'

function Login(props) {

    return (
    <section className="box">
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

export default Login