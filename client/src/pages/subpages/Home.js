import React from "react";
import Information from "../../components/Information";
import Hero from "../../components/Hero"

function Home(){
    return (
        <div>
            <Hero backgroundImage="/assets/images/family.jpg">
                <h1>Vesta</h1>
                <h2>A home management hub, for families on-the-go!</h2>
            </Hero>
            <Information />
        </div>
    )
}

export default Home;