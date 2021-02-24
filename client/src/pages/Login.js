import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import Auth from '../utils/auth'
import { LOGIN } from '../utils/mutations'
import signinphoto from '../assets/images/signin.jpg'

function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' })
    const [login, { error }] = useMutation(LOGIN)

    const handleChange = event => {
        const { name, value } = event.target

        setFormState({
            ...formState,
            [name]: value,
        })
    }

    const handleFormSubmit = async event => {
        event.preventDefault()

        try {
            const { data } = await login({
                variables: { ...formState }
            })
            const id = data.login.employee._id
            Auth.login(data.login.token, id)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
    <section className="section">
        <h1 className="title has-text-centered">Sign In</h1>
        <div className="columns is-vcentered">
            <div className="column"></div>
            <div className="box column is-one-third">
                <form onSubmit={handleFormSubmit}>
                    <div className="field">
                        <label className="label">Email:</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="email" name="email" id="email" placeholder="Email" value={formState.email} onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <label className="label">Password:</label>
                        <p className="control has-icons-left has-icons-right">
                            <input className="input" type="password" name="password" id="password" placeholder="Password" value={formState.password} onChange={handleChange}></input>
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>

                    <div className="field">
                        <button className="button is-primary" type="submit">Submit</button>
                    </div>
                </form>
                {error && <div>Login Failed</div>}
            </div>

            <div className="column"></div>

            <div className="column is-one-third">
                <figure className="image is-256x256">
                    <img className="is-rounded" src={signinphoto}></img>
                </figure>
            </div>

            <div className="column"></div>
        </div>
    </section>
    )
}

export default Login