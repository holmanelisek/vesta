import React, { Component } from "react";
import Select from 'react-select'
import API from '../../utils/API'

export class DeleteChore extends Component {
    state = {
        chore_id: undefined
    }

    handleChange = selection => this.setState({ chore_id: selection.value })

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

    render() {
        // this.props.getChores(this.props.home_id)
        console.log(this.props.chores[0].chore_name)
        const choreOptions = this.props.chores.map(chore => ({ value: chore.id, label: chore.chore_name }))
        console.log(choreOptions)

        return (
            <div>
                <Select
                    value={this.chore_id}
                    onChange={this.handleChange}
                    options={choreOptions}
                />
                <button type='button' className='btn btn-danger' onClick={this.deleteChore}>Delete</button>
            </div>
        )

    }
}

export function DeleteChoreTitle() {
    return (
        <div>
            <h2>Delete a chore</h2>
        </div>
    )
};