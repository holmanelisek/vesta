import React from "react";
import Container from "../Container";
import "./index.css";


function Information (){
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
                            <h4 className="service-heading">Chores</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                        </div>
                        {/* PETS */}
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                            <img className="rounded-circle headshot" src="./assets/images/paw-color.png" alt="Pet Icon"></img>
                            </span>
                            <h4 className="service-heading">Pets</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                        </div>
                        {/* PANTRY */}
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                            <img className="rounded-circle headshot" src="./assets/images/apple-color.png" alt="Pantry Icon"></img>
                            </span>
                            <h4 className="service-heading">Pantry</h4>
                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
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
                            <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a href="#">
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
                        <p className="text-muted">Back-End Developer</p>
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item">
                            <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a href="#">
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
                        <p className="text-muted">Back-End Developer</p>
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item">
                            <a href="#">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            </li>
                            <li className="list-inline-item">
                            <a href="#">
                                <i className="fas fa-envelope"></i>
                            </a>
                            </li>
                        </ul>
                        </div>
                    </div>
                    {/* 4TH PERSON */}
                    <div className="col-sm-3">
                    <div className="team-member">
                    <img className="rounded-circle headshot" src="./assets/images/steph.jpg" alt="Stephanie Rose"></img>
                    <h4>Stephanie Rose</h4>
                    <p className="text-muted">Front-End Developer</p>
                    <ul className="list-inline social-buttons">
                        <li className="list-inline-item">
                        <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a href="#">
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