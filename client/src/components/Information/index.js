import React from "react";
import Container from "../Container";


function Information() {
    return (
        <Container>
            {/* ABOUT */}
            <div className="row" id="about">
                <div className="col-md-12">
                    <section className="my-5">
                        <h1 className="questions">What is Vesta?</h1><br />
                        <p>The Vesta Home Management Hub helps you keep your family in order.</p>
                        <p>Create your Home, give out the "keys," and keep track of chores, pets, pantry items, and more.</p>
                    </section>
                </div>
            </div>
            <hr />

            {/* FEATURES */}
            <div className="row" id="services">
                <div className="col-md-12">
                    <section className="my-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12 text-center">
                                    <h2 className="section-heading text-uppercase">Features</h2>
                                    <h4 className="section-subheading text-muted subheader">Manage chores lists, pet care, low pantry items, and more!</h4>
                                </div>
                            </div>
                            <div className="row text-center">
                                {/* CHORES */}
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <img className="rounded-circle headshot" src="./assets/images/broom-color.png" alt="Chores Icon"></img>
                                    </span>
                                    <h3 className="service-heading">Chores</h3>
                                    <p className="text-muted">Add chores to the household list and assign them to members of your home. Chores receive deadlines and point values are so you can track and rewards your kids with prizes in exchange for points.</p>
                                </div>
                                {/* PETS */}
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <img className="rounded-circle headshot" src="./assets/images/paw-color.png" alt="Pet Icon"></img>
                                    </span>
                                    <h3 className="service-heading">Pets</h3>
                                    <p className="text-muted">Create a list of all your pets, including adorable photos, their age, health data, and vet information. Contact information for your veterinarian is also included so you can have quick access when Fido needs care!</p>
                                </div>
                                {/* PANTRY */}
                                <div className="col-md-4">
                                    <span className="fa-stack fa-4x">
                                        <img className="rounded-circle headshot" src="./assets/images/apple-color.png" alt="Pantry Icon"></img>
                                    </span>
                                    <h3 className="service-heading">Pantry</h3>
                                    <p className="text-muted">Track what’s in stock in your home pantry based on name, item type, date it was purchased, and quantity. Use this data to determine if you have the right ingredients for your favorite recipes!</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <hr />

            {/* TEAM HEADLINE HERE */}
            <div className="row" id="team">
                <div className="col-lg-12 text-center">
                    <section className="my-5">
                        <h2 className="section-heading text-uppercase">Our Amazing Team</h2>
                        <h4 className="section-subheading text-muted subheader">We can't wait to hear from you.</h4>
                    </section>
                </div>

                {/* TEAM MEMBERS SECTION */}
                <div className="row text-center">
                    {/* 1ST PERSON */}
                    <div className="col-sm-3">
                        <div className="team-member">
                            <img className="rounded-circle headshot" src="./assets/images/mao.jpg" alt="Mao Lin"></img>
                            <h4>Mao Lin</h4>
                            <p className="text-muted">Team Lead / Developer</p>
                            <ul className="list-inline social-buttons">
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/maoxlin/" target="_blank">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="mailto:lin.maoxian0991@gmail.com">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* 2ND PERSON */}
                    <div className="col-sm-3">
                        <div className="team-member">
                            <img className="rounded-circle headshot" src="./assets/images/elise.jpg" alt="Elise Holman"></img>
                            <h4>Elise Holman</h4>
                            <p className="text-muted">Developer</p>
                            <ul className="list-inline social-buttons">
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/elise-holman-24a55518b/" target="_blank">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="mailto:holmanelisek@gmail.com">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* 3RD PERSON */}
                    <div className="col-sm-3">
                        <div className="team-member">
                            <img className="rounded-circle headshot" src="./assets/images/dalton.jpg" alt="Dalton Maurer"></img>
                            <h4>Dalton Maurer</h4>
                            <p className="text-muted">Developer</p>
                            <ul className="list-inline social-buttons">
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/dalton-m-maurer/" target="_blank">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="mailto:dalton.m.maurer@gmail.com">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* 4TH PERSON */}
                    <div className="col-sm-3">
                        <div className="team-member">
                            <img className="rounded-circle headshot" src="./assets/images/stephanie.jpg" alt="Stephanie Rose"></img>
                            <h4>Stephanie Rose</h4>
                            <p className="text-muted">Developer</p>
                            <ul className="list-inline social-buttons">
                                <li className="list-inline-item">
                                    <a href="https://www.linkedin.com/in/stephaniehlrose/" target="_blank">
                                        <i className="fab fa-linkedin-in"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="mailto:stephlarkinrose@gmail.com">
                                        <i className="fas fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Information;