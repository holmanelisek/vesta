import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Pets from "../../components/Pets";
import API from "../../utils/API";
import Chores from '../../components/Chores/index'

class Homehub extends Component {
  constructor(){
    super();

    this.state = {
      chores: [],
      petData: [],
      // users: []
      user_id: undefined,
      username: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      home_id: undefined,
      homeName: undefined,
      homeCity: undefined,
      homeState: undefined,
      primary_vets: undefined,
    };

  }

  componentDidMount() {
    console.log(this.props.state);
    if (this.props.authenticated) {
      this.updateStateValues(this.props.state)
      this.getChores(this.props.state.home_id);
      this.getPetData(this.props.state.home_id);
      this.handleFindHome(this.props.state.home_id)
    }
  }

  updateStateValues = (values) =>{
    this.setState({
      user_id: values.user_id,
      username: values.username,
      firstname: values.firstname,
      lastname: values.lastname,
      email: values.email,
      home_id: values.home_id,
    });
  }

  handleFindHome = (homeid) => {
    API.findHomeById(homeid)
        .then(response=> {
            console.log(response.data)
            this.setState({
                homeName: response.data.home_name,
                homeCity: response.data.city,
                homeState: response.data.state,
                home_id: response.data.id,
            })
        }).catch(err => {
            console.log(err)
        })
  }

  findUncompletedChores = item => {
    return !item.completed
  }

  // storeUsernames = array => {
  //     return array.username;
  // }

  // grabUsers = userHome => {
  //     API.getAllHomeUsers({
  //         home_id: userHome
  //     })
  //         .then(res => {
  //             let usersArray = res.data.map(this.storeUsernames)
  //             this.setState({ users: usersArray });
  //             console.log(this.state.users);
  //         })
  // }

  //Removes duplicate vet ids from pets array
  removeDuplicates = (array) => {
    let finalArray = array.reduce((tempArray, arrayValue)=>{
      if(tempArray.indexOf(arrayValue.primary_vet_id) === -1){
        tempArray.push(arrayValue.primary_vet_id)
      }
      return tempArray;
    }, [])
    //Return array with no repeat vet IDs
    return finalArray;
  }

  getChores = (homeid) => {
    API.getAllChores({
      home_id: homeid
    })
      .then(res => {
        console.log(res.data)
        let choresArray = res.data.filter(this.findUncompletedChores)
        this.setState({ chores: choresArray });
        console.log(this.state.chores);
      })
  };

  //Function to get pet data by home id and vets data for pets
  getPetData = (homeid) => {
    console.log("Getting pet data")
    //Api call for getting all bets beloning to home
    API.getAllPets({home_id: homeid}).then( res => {
      console.log(this.state.petData)
      this.setState({
        petData: res.data
      })

      //Calls function removeDuplicates and sets vetsArray to return value
      let vetsArray = this.removeDuplicates(res.data);
      //Apy call to get vets data by the array in vetsArray
      API.getVetsByMultId({vets: vetsArray}).then( vetData => {
        console.log(vetData.data);
        this.setState({
          primary_vets: vetData.data
        })
      }).catch()

    }).catch()
  }

  //Function to change the state values on input change
  handleInputChange = event => {

  };

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
                      {this.state.chores.map(chore => (
                        <Chores
                          key={chore.id}
                          // users={this.state.users}
                          id={chore.id}
                          choreName={chore.chore_name}
                          createdBy={chore.created_by}
                          assignedUser={chore.assigned_user}
                          pointValue={chore.point_value}
                          starTDateTime={chore.start_date_time}
                          endDateTime={chore.end_date_time}
                          repeatInterval={chore.repeat_interval}
                          getChores={this.getChores}
                        />
                      ))}
                    </div>

                    {/* pet data goes here */}
                    <div className="tab-pane fade" id="pets" role="tabpanel" aria-labelledby="pets-tab">
                      <div className="container" style={{ textAlign: "center" }}>
                        <div className="row">
                          {this.state.petData.map(pet => (
                              <Pets
                                key = {pet.id} 
                                pet = {pet}
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
            </div>
            :
            <Redirect to="/"/>
          }
      </div>
    )
  }
}

export default Homehub;