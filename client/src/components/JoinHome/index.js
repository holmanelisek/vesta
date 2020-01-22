import React from "react";

function JoinHome(props){
    return (      
        <div>
            <div className="modal-body mx-2">
                {/* Home Key Input*/}
                <div className="my-2">
                    <div>{props.homeinfo.homeName}</div>
                    <div>{props.homeinfo.homeCity}, {props.homeinfo.homeState}</div>
                </div>
            </div>
            <div className="modal-footer d-flex justify-content-center">
                {/* Submit Button */}
                <button type="submit" onClick={props.handleJoinSubmit} className="btn btn-deep-orange">Join Home</button>
            </div>
        </div>)
}

export default JoinHome;