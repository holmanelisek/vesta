import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import DatePicker from "react-datepicker";
import Pets from "../../components/Pets";
import { NewPetForm, NewPetTitle } from "../../components/NewPetForm";
import { NewVetForm, NewVetTitle } from "../../components/NewVetForm";
import API from "../../utils/API";
import Chores from '../../components/Chores/index'
import { AddChore, AddChoreTitle } from '../../components/AddChore/index'

class Homehub extends Component {
  constructor() {
    super();

    this.state = {
      selectedDeleteOption: undefined,
      selectedAddOption: undefined,
      mondalFunc: undefined,
      modalShow: undefined,
      chores: [],
      petData: [],
      user_id: undefined,
      username: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      home_id: undefined,
      homeName: undefined,
      homeCity: undefined,
      homeState: undefined,
      all_vets: undefined,
      primary_vets: undefined,
      home_admin: undefined,
      selectedOption: '',
      users: [],
      chore_name: '',
      created_by: '',
      point_value: '',
      startDate: new Date(),
      newPetData: {
        pet_name: undefined,
        age: undefined,
        animal_type: undefined,
        primary_vet_id: undefined,
        emergency_vet_id: undefined
      },
      newVetData: {
        practice_name: undefined,
        phone_number: undefined,
        street: undefined,
        city: undefined,
        state: undefined,
        zip: undefined,
        email: undefined,
        emergency_clinic: undefined
      },
    };

  }

  componentDidMount() {
    //console.log(this.props.state);
    if (this.props.authenticated) {
      this.grabUsers(this.props.state.home_id);
      this.getChores(this.props.state.home_id);
      this.getPetData(this.props.state.home_id);
      this.handleFindHome(this.props.state.home_id)
    }
  }

  submitPet = (newPetData, admin, user) => {
    if (admin === user) {
      console.log("Here doggy!")
      API.addPet(newPetData)
        .then(response => {
          console.log(response.data)
          this.props.getPetData(this.props.home_id)
        })
    }
  }

  adminFunctionAddpet = (admin, user) => {
    console.log(this.props)
    if (admin === user) {
      return (
        <div>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => this.openModal("newPet")}>Add Pet</button>
          <button type="button" className="btn btn-secondary mx-2" onClick={() => this.openModal("newVet")}>Add Vet</button>
        </div>
      )
    } else {
      return null
    }
  }

  adminFunctionAddChore = (admin, user) => {
    console.log(this.props)
    if (admin === user) {
      return (
        <button type="button" className="btn btn-secondary" onClick={() => this.openModal("addChore")}>Add Chore</button>
      )
    } else {
      return null
    }
  }

  adminFunctionDeleteChore = (admin, user) => {
    console.log(this.props)
    if (admin === user) {
      return (
        <button type="button" className="btn btn-danger" onClick={() => this.openModal("deleteChore")}>Delete Chore</button>
      )
    } else {
      return null
    }
  }

  handleFindHome = (homeid) => {
    API.findHomeById(homeid)
      .then(response => {
        //console.log(response.data)
        this.setState({
          user_id: this.props.state.user_id,
          username: this.props.state.username,
          firstname: this.props.state.firstname,
          lastname: this.props.state.lastname,
          homeName: response.data.home_name,
          homeCity: response.data.city,
          homeState: response.data.state,
          home_id: response.data.id,
          home_admin: response.data.home_admin
        })
        //this.updateStateValues(this.props.state)
      }).catch(err => {
        console.log(err)
      })
  }

  findUncompletedChores = item => {
    return !item.completed
  }

  storeUsernames = array => {
    return array.username;
  }

  grabUsers = userHome => {
    API.getAllHomeUsers({
      home_id: userHome
    })
      .then(res => {
        let usersArray = res.data.map(this.storeUsernames)
        this.setState({ users: usersArray });
        console.log(this.state.users);
      })
  }

  //Removes duplicate vet ids from pets array
  removeDuplicates = (array) => {
    let thisArray = array
    let finalArray = thisArray.reduce((tempArray, arrayValue) => {
      if (tempArray.indexOf(arrayValue.primary_vet_id) === -1) {
        tempArray.push(arrayValue.primary_vet_id)
      }
      return tempArray;
    }, [])
    //Return array with no repeat vet IDs
    return finalArray;
  }

  //Function that iterates through each pet and inserts primary pet info as a new property
  insertVetToPet = (petArray, vetArray) => {
    petArray.forEach(thisPet => {
      let petVet = vetArray.find(({ id }) =>
        id = thisPet.primary_vet_id
      )
      thisPet.primary_vet_info = petVet;
    })

    return petArray;
  }

  getAllVets = () => {
    API.getAllVets()
      .then(response => {
        console.log(response)
        this.setState({ all_vets: response.data })
        this.displayAllVetsInPets();
      }).catch()
  }

  //Function to get all chroes by home id
  getChores = (homeid) => {
    API.getAllChores({
      home_id: homeid
    })
      .then(res => {
        //console.log(res.data)
        let choresArray = res.data.filter(this.findUncompletedChores)
        this.setState({ chores: choresArray });
        //console.log(this.state.chores);
      })
  };

  deleteChore = (choreId) => {
    console.log("test")
    // API.deleteChore({
    //   chore_id: choreId
    // })
    //   .then(res => {
    //     console.log(res);
    //   });
  };

  openModal = (modalFunc) => {
    this.setState({ modalFunc: modalFunc })
    this.setState({ modalShow: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalShow: false });
  }

  //Function to get pet data by home id and vets data for pets
  getPetData = (homeid) => {
    //Api call for getting all bets beloning to home
    API.getAllPets({ home_id: homeid })
      .then(res => {
        //Calls function removeDuplicates and sets vetsArray to return value
        let vetsArray = this.removeDuplicates(res.data);
        //Apy call to get vets data by the array in vetsArray
        API.getVetsByMultId({ vets: vetsArray })
          .then(vetData => {
            //Sets the state for primary_vets with the return API call data
            this.setState({
              primary_vets: vetData.data
            })
            //Sets petData state to the return array of the function insertVetToPet
            //This function inserts each pets primary vet information into each pet object in the array
            this.setState({
              petData: this.insertVetToPet(res.data, vetData.data)
            })
          }).catch()
      }).catch()
  }

  displayAllVetsInPets = () => {
    this.refs.displayAllVetsReference.getAllVetDropSelection();
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };

  handleStartDateChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleEndDateChange = date => {
    this.setState({
      endDate: date
    });
  };

  modalTitleSwitch(modalFunc) {
    switch (modalFunc) {
      case "pet":
        return (
          <div className="">
            <h2>{this.props.pet.pet_name}<span className="float-right">{this.adminFunctionDeletePet(this.props.home_admin, this.props.user)}</span></h2>
          </div>
        );
      case "newPet":
        return (
          <NewPetTitle />
        );
      case "newVet":
        return (
          <NewVetTitle />
        );
      case "addChore":
        return (
          <div>
            <h2>Add Chore</h2>
          </div>
        );
      case "deleteChore":
        return (
          <div>
            <h2>Delete Chore</h2>
          </div>
        );
    }
  };

  modalBodySwitch(modalFunc) {
    const choreOptions = this.state.chores.map(chore => (
      { value: chore.id, label: chore.chore_name }
    ))
    const { selectedDeleteOption } = this.state;

    const userOptions = this.state.users.map(user => (
      { value: user, label: user }
    ))
    // const { selectedAddOption } = this.state;

    switch (modalFunc) {
      case "pet":
        return (
          <div>
            <p>Pet Name: {this.props.pet.pet_name}</p>
            <p>Pet Aage: {this.props.pet.age}</p>
            <hr />
            <p>Primary Vet: {this.props.pet.primary_vet_info.practice_name}</p>
            <p>Phone Number: {this.props.pet.primary_vet_info.phone_number}</p>
            <p>Address: {this.props.pet.primary_vet_info.street}, {this.props.pet.primary_vet_info.city}, {this.props.pet.primary_vet_info.state} {this.props.pet.primary_vet_info.zip}</p>
            <hr />
            <p className="card-text">Pets description</p>
          </div>
        );
      case "newPet":
        return (
          <NewPetForm
            ref="displayAllVetsReference"
            all_vets={this.state.all_vets}
            primary_vets={this.state.primary_vets}
            home_id={this.state.home_id}
            getPetData={this.getPetData}
            closeModal={this.closeModal}
            getAllVets={this.getAllVets}
          />
        );
      case "newVet":
        return (
          <NewVetForm
            home_id={this.state.home_id}
            getPetData={this.getPetData}
            closeModal={this.closeModal}
          />
        );
      case "addChore":
        return (
          < AddChore
            home_id={this.state.home_id}
            getChores={this.getChores}
            closeModal={this.closeModal}
            created_by={this.props.state.firstname}
          />
        );
      case "deleteChore":
        return (
          <div>
            <Select
              value={selectedDeleteOption}
              onChange={this.handleChange}
              options={choreOptions}
            />
          </div>
        );
    }
  }

  render() {
    return (
      <div>
        {this.props.authenticated ?
          <div>
            <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
              <h1>Home Hub</h1>
              <h4>{this.state.homeName}</h4>
            </div>
            {/*contents go here */}
            <div style={{ clear: "both" }}>
              <div className="card">
                <div className="card-body" style={{ textAlign: "center" }}>
                  <ul className="nav nav-tabs" id="home-hub-tabs" role="tablist" style={{ display: "inline-block", fontSize: 20, fontWeight: "bold" }}>
                    <li className="nav-item" style={{ display: "inline" }}>
                      <a className="nav-link active" id="chores-tab" data-toggle="tab" href="#chores" role="tab" aria-controls="chores" aria-selected="true" style={{ float: "left" }}>Chores</a>
                    </li>
                    <li className="nav-item" style={{ display: "inline" }}>
                      <a className="nav-link" id="pets-tab" data-toggle="tab" href="#pets" role="tab" aria-controls="pets" aria-selected="false" style={{ float: "left" }}>Pets</a>
                    </li>
                    <li className="nav-item" style={{ display: "inline" }}>
                      <a className="nav-link" id="pantry-tab" data-toggle="tab" href="#pantry" role="tab" aria-controls="pantry" aria-selected="false" style={{ float: "left" }}>Pantry</a>
                    </li>
                  </ul>

                  {/* all the content for the tabs goes below */}
                  <div className="tab-content" id="myTabContent" style={{ paddingTop: 20 }}>

                    {/* chores content goes here */}
                    <div className="tab-pane fade show active" id="chores" role="tabpanel" aria-labelledby="chores-tab" style={{ textAlign: "center" }}>
                      {/* <AddChore user_id={this.state.user_id} handleClick={this.handleClick} getChores={this.getChores} /> */}
                      <br />
                      <div>
                        <span>{this.adminFunctionAddChore(this.state.home_admin, this.state.user_id)}</span>
                        <span>{this.adminFunctionDeleteChore(this.state.home_admin, this.state.user_id)}</span>
                      </div>
                      <hr />
                      {this.state.chores.map(chore => (
                        < Chores
                          key={chore.id}
                          // users={this.state.users}
                          id={chore.id}
                          choreName={chore.chore_name}
                          createdBy={chore.created_by}
                          assignedUser={chore.assigned_user}
                          pointValue={chore.point_value}
                          startDateTime={chore.start_date_time}
                          endDateTime={chore.end_date_time}
                          repeatInterval={chore.repeat_interval}
                          getChores={this.getChores}
                        />
                      ))}
                    </div>

                    {/* pet data goes here */}
                    <div className="tab-pane fade" id="pets" role="tabpanel" aria-labelledby="pets-tab">
                      <div className="container" style={{ textAlign: "center" }}>
                        <div>{this.adminFunctionAddpet(this.state.home_admin, this.state.user_id)}</div>
                        <hr />
                        <div className="row">
                          {this.state.petData.map(pet => (
                            <Pets
                              key={pet.id}
                              pet={pet}
                              user={this.state.user_id}
                              firstname={this.state.firstname}
                              home_id={this.state.home_id}
                              primary_vets={this.state.primary_vets}
                              home_admin={this.state.home_admin}
                              getPetData={this.getPetData}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* pantry data goes here */}
                    <div className="tab-pane fade" id="pantry" role="tabpanel" aria-labelledby="pantry-tab">
                      <div className="container">
                        <div className="row">
                          <div className="col-6">
                            <h4>Items in pantry:</h4>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item list-group-item-success"><h4>Cookies</h4>
                                <button type="button" className="btn btn-success" style={{ margin: 5 }}>Purchased!</button>
                              </li>
                            </ul>
                          </div>
                          <div className="col-6">
                            <h4>Items needed:</h4>
                            <ul className="list-group list-group-flush">
                              <li className="list-group-item list-group-item-danger"><h4>Milk</h4>
                                <button type="button" className="btn btn-success" style={{ margin: 5 }}>Purchased!</button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <br />
                      <div className="row">
                        <div className="col-12">
                          <p>Recipe Info Here</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={this.state.modalShow} onHide={this.closeModal} backdrop='static'>
              <Modal.Title>
                {this.modalTitleSwitch(this.state.modalFunc)}
              </Modal.Title>
              <Modal.Body>
                {this.modalBodySwitch(this.state.modalFunc)}
              </Modal.Body>
              <Modal.Footer>
                <div>
                  <button type="button" className="btn btn-secondary" onClick={this.closeModal}>Close</button>
                </div>
              </Modal.Footer>
            </Modal>
          </div>
          :
          <Redirect to="/" />
        }
      </div>
    )
  }
}

export default Homehub;