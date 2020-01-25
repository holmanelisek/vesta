import React, { Component } from 'react'
import Select from 'react-select'
import API from '../../utils/API'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

export class AddPantryItem extends Component {
    constructor() {
        super()

        this.state = {
            item_name: undefined,
            item_type: undefined,
            quantity: undefined,
            date_in: new Date(),
            categories: [
                'Baby',
                'Beverages',
                'Bread & Pasta',
                'Breakfast & Cereal',
                'Canned Goods & Soups',
                'Condiments/Spices & Bake',
                'Cookies, Snacks & Candy',
                'Dairy, Eggs & Cheese',
                'Deli',
                'Frozen Foods',
                'Produce',
                'International Cuisine',
                'Meat & Seafood',
                'Miscellaneous',
                'Paper Products',
                'Cleaning Supplies',
                'Health & Beauty',
                'Pet Care',
                'Pharmacy'
            ]
        }

        this.handleInputChange = this.handleInputChange.bind(this)
    }

    // Handles date box
    handleDateChange = date => {
        this.setState({
            date_in: date
        });
    };

    // Handles text input
    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // Handles drop down selector
    handleChange = selection => this.setState({ item_type: selection.value });

    // Post call to API for adding new item to pantry
    submitItem = () => {
        API.addPantryItem({
            home_id: this.props.home_id,
            item_name: this.state.item_name,
            item_type: this.state.item_type,
            quantity: this.state.quantity,
            date_in: this.state.date_in
        })
            .then(res => {
                console.log(res)
                this.props.listPantry(this.props.home_id)
                this.props.closeModal()
            })
            .catch(err => {
                console.log(err)
            });
    }

    // Creates options for dropdown selector
    buildOptions = () => {
        const typeOptions = this.state.categories.map(category => ({ value: category, label: category }))

        return typeOptions;
    }

    render() {
        return (
            <div>
                <div className="my-2">
                    {/*Name of Item*/}
                    <input
                        value={this.state.item_name}
                        onChange={this.handleInputChange}
                        type="text"
                        name="item_name"
                        id="item-name"
                        className="form-control"
                        placeholder="Item name"
                    ></input>
                </div>
                {/*Item Type*/}
                < Select
                    value={this.item_type}
                    onChange={this.handleChange}
                    options={this.buildOptions()}
                />
                <div className="my-2">
                    {/*Point Value*/}
                    <input
                        value={this.state.quantity}
                        onChange={this.handleInputChange}
                        type="number"
                        min="0"
                        name="quantity"
                        id="quantity"
                        className="form-control"
                        placeholder="Quantity"
                    ></input>
                </div>
                <div className="my-2">
                    {/*Date In*/}
                    <DatePicker
                        selected={this.state.date_in}
                        onChange={this.handleDateChange}
                        dateFormat="MMMM d"
                        placeholderText="Date added"
                    />
                </div>
                <button type="button" className="btn btn-secondary" onClick={this.submitItem}>Add</button>
            </div>
        )
    }
}

// Add Pantry Item modal title
export function AddPantryItemTitle() {
    return (
        <div>
            <h2>Add an item to your pantry</h2>
        </div>
    )
}