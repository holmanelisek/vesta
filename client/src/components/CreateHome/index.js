import React from "react";

export function CreateHome(props){
    return (        
        <div>
            <div className="modal-body mx-2">
                {/* Home Name */}
                <div className="my-2">
                    <label htmlFor="homeName">Home Name</label>
                    <input 
                        value={props.homeName}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="homeName"
                        id="homeName" 
                        className="form-control validate"
                        placeholder="Home Name"
                        required/>
                </div>
                {/* Home Street */}
                <div className="my-2">
                    <label htmlFor="homeStreet">Street Address</label>
                    <input
                        value={props.homeStreet}
                        onChange = {props.handleInputChange}
                        type="text"
                        name="homeStreet"
                        id="homeStreet" 
                        className="form-control validate"
                        placeholder="Street Address"/>
                </div>
                {/* Home Unit/Apt Number*/}
                <div className="my-2">
                    <label htmlFor="homeUnit">Home Apt#/ Unit#</label>
                    <input 
                        value={props.homeUnit}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeUnit"
                        id="homeUnit" 
                        className="form-control validate"
                        placeholder="Home Apt#/ Unit#"/>
                </div>
                {/* Home City */}
                <div className="my-2">
                    <label htmlFor="homeCity">City</label>
                    <input 
                        value={props.homeCity}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeCity"
                        id="homeCity" 
                        className="form-control validate"
                        placeholder="City"/>
                </div>
                {/* Home State */}
                <div className="my-2">
                    <label htmlFor="homeState">State</label>
                    <input 
                        value={props.homeState}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name="homeState"
                        id="homeState" 
                        className="form-control validate"
                        placeholder="Home State"/>
                </div>
                {/* Home Zip */}
                <div className="my-2">
                    <label htmlFor="homeZip">Zip Code</label>
                    <input 
                        value={props.homeZip}
                        onChange = {props.handleInputChange}
                        type="number" 
                        name="homeZip"
                        id="homeZip" 
                        className="form-control validate"
                        placeholder="Zip Code"/>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleCreateSubmit} className="btn btn-deep-orange">Submit</button>
            </div>
        </div>)
}

export function CreateHomeKey(props){
    return (      
        <div>
            <div className="modal-body mx-2">
                {/* Home Key Input*/}
                <div className="my-2">
                    <div>{props.homeinfo.homeName}</div>
                    <div>{props.homeinfo.homeStreet} {props.homeinfo.homeUnit}</div>
                    <div>{props.homeinfo.homeCity}, {props.homeinfo.homeState} {props.homeinfo.homeZip} </div>
                </div>
                <hr />
                <div className="my-2">
                    <div>Home key to invite others to your home</div>
                    <div>{props.homeinfo.homeKey}</div>
                </div>
                <hr />
                <div className="my-2">
                    <label htmlFor="masterKey">Create a master key to allow admin functions</label>
                    <input
                        value={props.masterKey}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="masterKey"
                        id="masterKey" 
                        className="form-control validate"
                        placeholder="Master Key"
                        required
                    />
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.createHomeSend} className="btn btn-deep-orange">Create Home</button>
            </div>
        </div>)
}