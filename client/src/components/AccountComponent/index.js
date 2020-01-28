import React ,{useState} from "react";
import Select from 'react-select';
import { Alert, Button } from "react-bootstrap";
import "./trashIcon.css";
import {Modal} from "react-bootstrap";

export function HouseMemeber(props){
    const [show, setShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [subShow, setSubShow] = useState(false);
    const [newPoint, setNewPoint] = useState(0)

    const closeModal = () => {
        setNewPoint(0)
        setAddShow(false)
        setSubShow(false)
    }

    return (
        <div className="border border rounded p-1 row">
            <div className="col ">
                <div>
                   <b>Name:</b> {props.member.first_name} {props.member.last_name}
                </div>
                <div>
                    <b>Email:</b> {props.member.email}
                </div>
                <div>
                    <b>Points</b> {props.member.points}                                         
                    {(props.home_admin === props.user_id) ?
                    <span>
                        <a href="#" onClick = {() => setAddShow(true)}><span className="float-left"><i className="fas fa-plus-square fa-2x"></i></span></a>
                        <a href="#" onClick = {() => setSubShow(true)}><span className="float-left"><i className="fas fa-minus-square fa-2x"></i></span></a>
                    </span>
                    :
                        null
                    }
                </div>
            </div>
            <div className="col">
                {(props.home_admin === props.user_id)?
                     <div>
                        {(props.member.id !== props.home_admin) ? 
                        <Alert show={show} variant="danger">
                            <p>Are you sure you want to remove {props.member.first_name}?</p>
                            <hr />
                            <div className="row">
                            <div className="col"><Button className="float-left"onClick={() => {setShow(false); props.removeMember(props.member.id, props.member.first_name)}} variant="danger" size="sm">Yes</Button></div> 
                            <div className="col"><Button className="float-right" onClick={() => setShow(false)} variant="danger" size="sm">No</Button></div>
                            </div>
                        </Alert>
                        :
                         <Alert show={show} variant="danger">
                            <p>You cannot remove the administrator.</p>
                            <hr />
                            <div className="row">
                                <div className="col"><Button className="float-right" onClick={() => setShow(false)} variant="danger" size="sm">Close</Button></div>
                            </div>
                        </Alert>
                        }
                        {!show && <div className="float-right trashIcon"><i className="far fa-trash-alt fa-2x" onClick={() => setShow(true)}></i></div>}
                    </div>
                :null}
            </div>
            <Modal
                size="sm"
                show={addShow}
                onHide={() => setAddShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop='static'
            >
                <Modal.Header >
                <Modal.Title id="example-modal-sizes-title-sm">
                    {props.member.first_name}'s Points
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row ">
                        <div className="col align-self-center">
                                <span className="float-right">Current Points:</span>
                            </div>
                            <div className="col-5">
                                <span className="">{props.member.points}</span>
                            </div>
                        </div>
                        <br />
                        <div className="row ">
                            <div className="col align-self-center">
                                <span className="float-right">Add Points:</span>
                            </div>
                            <div className="col-5">
                                <input
                                    value = {newPoint}
                                    type="number"
                                    onChange = {event => setNewPoint(Math.abs(event.target.value))}
                                    className="form-control validate"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row ">
                            <div className="col align-self-center">
                                <span className="float-right"><b>Total Points:</b></span>
                            </div>
                            <div className="col-5">
                                <span className="">{parseInt(props.member.points) + Math.abs(parseInt(newPoint))}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button className="btn btn-warning" onClick={() => {props.updateMemberPoint(props.member.id, parseInt(props.member.points) + Math.abs(parseInt(newPoint))); closeModal();}}>Update</button><span>  </span>
                        <button className="btn btn-info" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </Modal.Footer>
            </Modal>

            <Modal
                size="sm"
                show={subShow}
                onHide={() => setSubShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                backdrop='static'
            >
                <Modal.Header >
                <Modal.Title id="example-modal-sizes-title-sm">
                    {props.member.first_name}'s Points
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="container">
                        <div className="row ">
                        <div className="col align-self-center">
                                <span className="float-right">Current Points:</span>
                            </div>
                            <div className="col-5">
                                <span className="">{props.member.points}</span>
                            </div>
                        </div>
                        <br />
                        <div className="row ">
                            <div className="col align-self-center">
                                <span className="float-right">Subtract Points:</span>
                            </div>
                            <div className="col-5">
                                <input
                                    value = {newPoint}
                                    type="number"
                                    onChange = {event => setNewPoint(Math.abs(event.target.value))}
                                    className="form-control validate"
                                />
                            </div>
                        </div>
                        <hr />
                        <div className="row ">
                            <div className="col align-self-center">
                                <span className="float-right"><b>Total Points:</b></span>
                            </div>
                            <div className="col-5">
                                <span className="">{parseInt(props.member.points) - Math.abs(parseInt(newPoint))}</span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <button 
                            className="btn btn-warning" 
                            onClick={() => {
                                props.updateMemberPoint(props.member.id, parseInt(props.member.points) - Math.abs(parseInt(newPoint)));
                                closeModal();
                            }}>Update</button>
                        <span>  </span>
                        <button className="btn btn-info" onClick={() => closeModal()}>Cancel</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export function UpdateHomeName(props){
    return (
        <div>
            <div>
                <label htmlFor="home_name">New Home Name</label>
                <form>
                    <input 
                        value={props.home_name}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="home_name"
                        id="home_name" 
                        className="form-control validate"
                        placeholder="New Home Name"
                    />
                    <br />
                    <button type="button" className="btn btn-info" name="home_name" onClick={props.handleHomeInfoChange}>Update</button>
                </form>
            </div>
        </div>
    );
}

export function UpdateHomeAddress(props){
    return (
        <div>
            <div>
                <form>
                    <label htmlFor="home_street">Street Address</label>
                    <input 
                        value={props.home_street}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="home_street"
                        id="home_street" 
                        className="form-control validate"
                        placeholder={props.oldhome_street}
                    />
                    <br />
                    <label htmlFor="home_city">City</label>
                    <input 
                        value={props.home_city}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="home_city"
                        id="home_city" 
                        className="form-control validate"
                        placeholder={props.oldhome_city}
                    />
                    <br />
                    <label htmlFor="home_state">State</label>
                    <input 
                        value={props.home_state}
                        onChange = {props.handleInputChange}
                        type="text"
                        name ="home_state"
                        id="home_state" 
                        className="form-control validate"
                        placeholder={props.oldhome_state}
                    />
                    <br />
                    <label htmlFor="home_zip">Zip Code</label>
                    <input 
                        value={props.home_zip}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="home_zip"
                        id="home_zip" 
                        className="form-control validate"
                        placeholder={props.oldhome_zip}
                    />
                    <br />
                    <button type="button" className="btn btn-info" name="home_address" onClick={props.handleHomeInfoChange}>Update</button>
                </form>
            </div>
        </div>
    );
}

export function UpdateMasterKey(props){
    return (
        <div>
            <div>
                {/* New First Name */}
                <label htmlFor="new_master_key">New Master Key</label>
                <form>
                    <input 
                        value={props.new_master_key}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="new_master_key"
                        id="new_master_key" 
                        className="form-control validate"
                        placeholder="New Master Key"
                    />
                    <br />
                    <button type="button" className="btn btn-info" name="new_master_key" onClick={props.handleHomeInfoChange}>Update</button>
                </form>
            </div>
        </div>
    );
}

export function UpdateHomeKey(props){
    return (
        <div>
            <div>
                <button type="button" className="btn btn-primary" onClick={props.generateHomeKey}>Generate New Home Key</button>
            </div>
            <br />
            <div>
                <p>Key: {props.home_key}</p>
            </div>
            <br />
            <button type="button" className="btn btn-info" name="home_key" onClick={props.handleHomeInfoChange}>Update</button>
        </div>
    );
}

export function UpdateAdmin(props){
    return (
        <div>
            <div>
                <p>Select a new administrator</p>
                <Select 
                    value={props.new_admin_id}
                    onChange={props.handleSelectionMember}
                    options={props.members}
                />
            </div>
            <br />
            <button type="button" className="btn btn-info" name="home_key" onClick={props.handleHomeInfoChange}>Update</button>
        </div>
    );
}

export function UpdateFirstName(props){
    return (
        <div>
            <div>
                {/* New First Name */}
                <label htmlFor="first_name">New First Name</label>
                <form>
                    <input 
                        value={props.first_name}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="first_name"
                        id="first_name" 
                        className="form-control validate"
                        placeholder="First Name"
                    />
                    <br />
                    <button type="button" className="btn btn-info" name="first_name" onClick={props.handleAccountInfoChange}>Update</button>
                </form>
            </div>
        </div>
    );
}

export function UpdateLastName(props){
    return(
        <div>
            <form>
                {/* New First Name */}
                <label htmlFor="last_name">New Last Name</label>
                <input 
                    value={props.last_name}
                    onChange = {props.handleInputChange}
                    type="text" 
                    name ="last_name"
                    id="last_name" 
                    className="form-control validate"
                    placeholder="Last Name"
                />
            </form>
            <br/>
            <button type="button" className="btn btn-info" name="last_name" onClick={props.handleAccountInfoChange}>Update</button>
        </div>
    )
}

export function UpdateEmail(props){
    return(
        <div>
            <form>
                {/* New First Name */}
                <label htmlFor="email">New Email</label>
                <input 
                    value={props.email}
                    onChange = {props.handleInputChange}
                    type="text" 
                    name ="email"
                    id="email" 
                    className="form-control validate"
                    placeholder="Eamil"
                />
            </form>
            <br/>
            <button type="button" className="btn btn-info" name="email" onClick={props.handleAccountInfoChange}>Update</button>
        </div>
    )
}

export function UpdatePassword(props){
    return(
        <div className ={props.onSubmitErr}>
            <form>
                {/* New Password*/}
                <label htmlFor="password">Old Password</label>
                <input 
                    value={props.old_password}
                    onChange = {props.handleInputChange}
                    type="password"
                    name ="old_password"
                    id="old_password" 
                    className="form-control validate"
                    placeholder="Old Password"
                />
                <br/>
                <label htmlFor="password">New Password</label>
                <input 
                    value={props.password}
                    onChange = {props.handleInputChange}
                    type="password"
                    name ="password"
                    id="password" 
                    className="form-control validate"
                    placeholder="New Password"
                />
                <br/>
                <label htmlFor="password">Confirm New Password</label>
                <input 
                    value={props.password_confirm}
                    onChange = {props.handleInputChange}
                    type="password" 
                    name ="password_confirm"
                    id="password_confirm" 
                    className="form-control validate"
                    placeholder="New Password"
                />
                <br/>
            </form>
            <button type="button" className="btn btn-info" name="password"onClick={props.handleAccountPasswordChange}>Update</button>
        </div>
    )
}