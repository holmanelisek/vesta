import React from "react";

function Pets(pets){
    console.log(pets);
    return (
        <div className="col-sm-3">
        <div className="card">
          <img src={'https://i.pinimg.com/originals/ae/c4/53/aec453161b2f33ffc6219d8a758307a9.jpg'} class="card-img-top img-responsive" alt="Cute Puppy" />
          <div className="card-body">
            <h5 className="card-title">{pets.pet.pet_name}</h5>
            <p className="card-text">Age:{pets.pet.age}</p>
            <p className="card-text">Primary Vet: {pets.pet.primary_vet_id}</p>
            <p className="card-text">Emergency Vet: {pets.pet.emergency_vet_id}</p>
            <p className="card-text">Pets description</p>
            <a href="#" className="btn btn-primary">More information</a>
          </div>
        </div>
      </div>
    )
}

export default Pets