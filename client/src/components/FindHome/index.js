import React from "react";

function FindHome(props){
    return (        
        <div>
            <div className="modal-body mx-2">
                {/* Home Key Input*/}
                <div>Let's look for your home!</div>
                <hr/>
                <div className="my-2">
                    <label htmlFor="homekey">Home Key</label>
                    <input 
                        value={props.homeKey}
                        onChange = {props.handleInputChange}
                        type="text" 
                        name ="homeKey"
                        id="homekey" 
                        className="form-control validate"
                        placeholder="Home Key"
                        required
                        />
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleFindHome} className="btn btn-deep-orange">Find Home</button>
            </div>
        </div>)
}

export default FindHome;