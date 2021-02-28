import React from 'react'
import UpdateInfoForm from '../components/UpdateInfoForm'

const UpdateInfo = () => {
    return (
        <section className="section">
        <h1 className="title has-text-centered">Change Employee Contact</h1>
            <div className="columns">
                <div className="column">
                    <div className="notification is-info is-light">
                        <p className="title">Update Info:</p>
                        <br />
                            <UpdateInfoForm />
                        <br />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpdateInfo