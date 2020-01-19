import React from "react";

function Homeless(){
    return(
        <div>    
            <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
              <h1>Homeless</h1>
            </div>
            <div>
                <button>Create New Home</button>
                <button>Join a Home</button>
            </div>
        </div>
    )
}

export default Homeless;