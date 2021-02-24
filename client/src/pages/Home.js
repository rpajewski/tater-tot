import React from 'react'
import homepagePhoto from '../assets/images/homepage-photo.png'

const Home = () => { 
    return (
        <section className="section">
            <h1 className="title has-text-centered">How It Works</h1>

            <div className="tile is-ancestor">
                <div className="tile is-vertical is-8">
                    <div className="tile">
                        <div className="tile is-parent is-vertical">
                            <article className="tile is-child notification is-primary">
                                <p className="title">Step 1: Sign Up</p>
                                <p className="subtitle">To get started click the link above</p>
                            </article>
                            <article className="tile is-child notification is-warning">
                                <p className="title">Step 2: Add a Request Off</p>
                                <p className="subtitle">Create this in your employee overview page</p>
                            </article>
                        </div>

                        <div className="tile is-parent">
                            <article className="tile is-child notification is-info">
                                <p className="title">Step 3: Wait</p>
                                <p className="subtitle">Your supervisor can review your newly submitted request off and determine if it can be approved. If approved you will be notified in your employee overview page</p>
                            </article>
                        </div>
                    </div>
                        
                    <div className="tile is-parent">
                        <article className="tile is-child notification is-danger">
                            <p className="title">While You Wait:</p>
                            <p className="subtitle">Check the employee directory to get in touch with your fellow co-workers</p>
                        </article>
                    </div>
                </div>

                <div className="tile is-parent">
                    <article className="tile is-child notification is-success">
                        <div className="content">
                            <figure className="image is-square">
                                <img src={homepagePhoto}></img>
                            </figure>
                        </div>
                    </article>
                </div>
            </div>
        </section>
    )
}

export default Home