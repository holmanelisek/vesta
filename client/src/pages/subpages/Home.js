import React from "react";
import Information from "../../components/Information";
import Hero from "../../components/Hero"

function Home(){
    return (
        <div>
            <Hero backgroundImage="/assets/images/family.jpg">
                <h1>Vesta</h1>
                <h2>Some good marketing should go here</h2>
            </Hero>
            <Information />
        </div>
    )
}

export default Home;