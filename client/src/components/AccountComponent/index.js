import React from "react";

export function HouseMemeber(props){
    console.log(props)
    return (
        <div>
            <div>
                Name: {props.member.first_name} {props.member.ast_name}
            </div>
            <div>
                Email: {props.member.email}
            </div>
        </div>
    )
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
                    <button type="button" name="first_name" onClick={props.handleAccountInfoChange}>Update</button>
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
            <button type="button" name="last_name" onClick={props.handleAccountInfoChange}>Update</button>
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
            <button type="button" name="email" onClick={props.handleAccountInfoChange}>Update</button>
        </div>
    )
}

export function UpdatePassword(props){
    return(
        <div className ={props.onSubmitErr}>
            <form>
                {/* New First Name */}
                <label htmlFor="password">New Password</label>
                <input 
                    value={props.password}
                    onChange = {props.handleInputChange}
                    type="password"
                    name ="password"
                    id="password" 
                    className="form-control validate"
                    placeholder="Password"
                />
                <label htmlFor="password">Confirm Password</label>
                <input 
                    value={props.password_confirm}
                    onChange = {props.handleInputChange}
                    type="password" 
                    name ="password_confirm"
                    id="password_confirm" 
                    className="form-control validate"
                    placeholder="Password"
                />
            </form>
            <button type="button" onClick={props.handleAccountPasswordChange}>Update</button>
        </div>
    )
}