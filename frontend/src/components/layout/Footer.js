import React, { Fragment } from 'react'
import { FaGithub, } from 'react-icons/fa'
import { GrLinkedin, GrInstagram } from 'react-icons/gr'

const Footer = () => {
    return (
        <Fragment>
            <footer className="py-4">
                <div className="container" >
                    <div>
                        <div className="text-center mb-1">
                            Follow me on:
                        </div>
                    </div>
                    <div className="footer_icons">
                        <div className="col-1">
                            <a target="_blank" rel="noreferrer" href="https://github.com/Alwin24">
                                <FaGithub color="white" size="2rem" />
                            </a>
                        </div>

                        <div className="col-1">
                            <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/alwin-helor-95a165205/">
                                <GrLinkedin color="white" size="2rem" />
                            </a>
                        </div>

                        <div className="col-1">
                            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/alwin_helor/">
                                <GrInstagram color="white" size="2rem" />
                            </a>
                        </div>
                    </div>

                </div>
            </footer >
        </Fragment >
    )
}

export default Footer
