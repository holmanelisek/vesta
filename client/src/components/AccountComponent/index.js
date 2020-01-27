import React ,{useState} from "react";
import Select from 'react-select';
import { Alert, Button } from "react-bootstrap";
import "./trashIcon.css";

export function HouseMemeber(props){
    const [show, setShow] = useState(false);

    return (
        <div className="border border rounded m-1 p-1 row">
            <div className="col-6">
                <div>
                   <b>Name:</b> {props.member.first_name} {props.member.last_name}
                </div>
                <div>
                    <b>Email:</b> {props.member.email}
                </div>
            </div>
            <div className="col-6">
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
        </div>
    )
}

export function RemoveHouseMember(props){
    return (
        <div>
            <div>

            </div>
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