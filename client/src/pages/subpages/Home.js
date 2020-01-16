import React from "react";
import Information from "../../components/Information";
import Hero from "../../components/Hero"

function Home(){
    return (
        <div>
            <Hero backgroundImage="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260">
                <h1>Vesta</h1>
                <h2>Some good marketing should go here</h2>
            </Hero>
            <Information />
        </div>
    )
}

export default Home;