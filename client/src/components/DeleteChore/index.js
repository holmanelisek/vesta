import React, { Component } from "react";
import Select from 'react-select'
import API from '../../utils/API'

export class DeleteChore extends Component {
    state = {
        chore_id: undefined
    }

    // Handling dropdown
    handleChange = selection => this.setState({ chore_id: selection.value })

    // Post to API for deleting chore
    deleteChore = () => {
        console.log(this.state.chore_id)
        API.deleteChore({
            chore_id: this.state.chore_id
        })
            .then(res => {
                console.log(res)
                this.props.getChores(this.props.home_id)
                this.props.closeModal()
            })
            .catch(err => {
                console.log(err)
            })
    }

    // Creating object of chores for dropdown
    buildOptions = () => {
        const choreOptions = this.props.chores.map(chore => ({ value: chore.id, label: chore.chore_name }))

        return choreOptions;
    }

    render() {
        return (
            <div>
                <Select
                    value={this.chore_id}
                    onChange={this.handleChange}
                    options={this.buildOptions()}
                />
                <button disabled={!this.state.chore_id} type='button' className='btn btn-danger' onClick={this.deleteChore}>Delete</button>
            </div>
        )

    }
}

// Delete Chore modal title
export function DeleteChoreTitle() {
    return (
        <div>
            <h2>Delete a chore</h2>
        </div>
    )
};