import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Pets from "../../components/Pets";
import API from "../../utils/API";
import Chores from '../../components/Chores/index'

class Homehub extends Component {
  state = {
    isSignedIn: false,
    chores: [],
    petData: [],
    // users: []
  };

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

  getChores = userHome => {
    API.getAllChores({
      home_id: userHome
    })
      .then(res => {
        console.log(res.data)
        let choresArray = res.data.filter(this.findUncompletedChores)
        this.setState({ chores: choresArray });
        console.log(this.state.chores);
      })
  };

  getPetData(homeid){
    console.log("Getting pet data")
    console.log(homeid)
    API.getAllPets({home_id: homeid}).then( res => {
      this.setState({petData: res.data})
      console.log(this.state.petData)
    }).catch()
  }

  componentDidMount() {
    if (this.props.authenticated) {
      this.getChores(1);
      this.getPetData(1);
    }
  }

  handleAuth = () => {
    // API.isSignedIn()
    // .then(res => {
    //   console.log(res.data);
    if (this.state.isSignedIn) {
      console.log("True");
      return (
        <div>
          <h1>Home Hub</h1>
        </div>
      )
    } else {
      console.log("False");
      return (<Redirect to="/" />);
    }
    // }).catch(err => {

    // })
  }

  //Function to change the state values on input change
  handleInputChange = event => {

  };

  render() {
    return (
      <div>
        {/* page header goes here */}
        <div style={{ textAlign: "center", height: 200, clear: "both", paddingTop: 120 }} className="jumbotron">
          <h1>Home Hub</h1>
        </div>

        {/* contents go here */}
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
                            pet = {pet}
                            />
                        ))};
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
    );
  }
}

export default Homehub;