import React, { Component } from "react";
import  { Redirect, Link } from 'react-router-dom'
import Hero from "../components/Hero";
import Container from "../components/Container";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import API from "../utils/API";

class Home extends Component {
  state = {
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  };

  //Function to change the state values on input change
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value.trim() });
  };

  //Function for 
  handleSignInSubmit = event => {
    event.preventDefault();
    //API post for signing in
    API.signIn({
      //This is the data the API server requires for signing up, change them based on the what the server requires.
      email: this.state.email,
      password: this.state.password
    }).then(response => {
        console.log(response.data)
        if(response.data.username){
          window.location.reload(false);
        }
    }).catch(err => {
      //Do something with the err
      console.log(err)
    })
  };

  //Function for signing up
  handleSignUpSubmit = event => {
    event.preventDefault();
    //API post for signing up.
    API.signUp({
        //This is the data the API server requires for signing up, change them based on the what the server requires.
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
        fName: this.state.firstname,
        lName: this.state.lastname
      }).then( response => {

      }).catch( err => {
        //Do something with error
    });
  }

  render() {
    return (
      <div id="page-top">
        <Hero backgroundImage="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260">
          <h1>Vesta</h1>
          <h2>Some good marketing should go here</h2>
        </Hero>
        <Container>
          {/* ABOUT */}
          <div className="row" id="about">
            <div className="col-md-12">
              <section className="my-5">
                <h1>Vesta Home Management</h1><br />
                <p>Here is where we tell you fun stuff about Vesta.</p>
                <p>It's an app to keep your family in order. That said, we can't help you if your kid is a brat.</p>
                <p>This isn't an app to teach her kid how NOT to be a brat, but it WILL help you organize their chores lists.</p>
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
                      <h4 className="section-subheading text-muted">Manage chores lists, pet care, low pantry items, and more!</h4>
                    </div>
                  </div>
                  <div className="row text-center">
                    {/* CHORES */}
                    <div className="col-md-4">
                      <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-sitemap fa-stack-1x fa-inverse"></i>
                      </span>
                      <h4 className="service-heading">Chores</h4>
                      <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    {/* PETS */}
                    <div className="col-md-4">
                      <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-dog fa-stack-1x fa-inverse"></i>
                      </span>
                      <h4 className="service-heading">Pets</h4>
                      <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
                    </div>
                    {/* PANTRY */}
                    <div className="col-md-4">
                      <span className="fa-stack fa-4x">
                        <i className="fas fa-circle fa-stack-2x text-primary"></i>
                        <i className="fas fa-shopping-basket fa-stack-1x fa-inverse"></i>
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
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </section>
            </div>
          </div>

          {/* TEAM MEMBERS SECTION */}
          <div className="row">
            {/* 1ST PERSON */}
            <div className="col-sm-3">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src="img/team/1.jpg" alt=""></img>
                <h4>Kay Garland</h4>
                <p className="text-muted">Lead Designer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* 2ND PERSON */}
            <div className="col-sm-3">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src="img/team/2.jpg" alt=""></img>
                <h4>Larry Parker</h4>
                <p className="text-muted">Lead Marketer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* 3RD PERSON */}
            <div className="col-sm-3">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src="img/team/3.jpg" alt=""></img>
                <h4>Diana Pertersen</h4>
                <p className="text-muted">Lead Developer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* 4TH PERSON */}
            <div className="col-sm-3">
              <div className="team-member">
                <img className="mx-auto rounded-circle" src="img/team/3.jpg" alt=""></img>
                <h4>Diana Pertersen</h4>
                <p className="text-muted">Lead Developer</p>
                <ul className="list-inline social-buttons">
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
        {/* SignIn Component */}
        <SignIn
          // Passing through functions
          handleFormSubmit={this.handleSignInSubmit}
          handleInputChange={this.handleInputChange}
        />
        {/* SignUp Component */}
        <SignUp
          // Passing through functions
          handleSignUpSubmit={this.handleSignUpSubmit}
          handleInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Home;
