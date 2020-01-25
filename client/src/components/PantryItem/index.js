import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, Alert } from 'react-bootstrap'
import API from '../../utils/API'
import Moment from 'react-moment'

class PantryItem extends Component {
    state = {
        modalShow: false,
        modalFunc: undefined,
        cardIcon: undefined
    }

    openModal = modalFunc => {
        this.setState({ modalFunc: modalFunc })
        this.setState({ modalShow: true });
    }

    closeModal = () => {
        this.setState({ modalShow: false });
    }

    iconGenerator = type => {
        let icon = undefined;

        switch (type) {
            case "Baby":
                icon = "baby-carriage";
                break;
            case "Beverages":
                icon = "coffee";
                break;
            case "Bread & Pasta":
                icon = "bread-slice";
                break;
            case "Breakfast & Cereal":
                icon = "bacon";
                break;
            case "Canned Goods & Soups":
                icon = "utensil-spoon";
                break;
            case "Condiments/Spices & Bake":
                icon = "pepper-hot";
                break;
            case "Cookies, Snacks & Candy":
                icon = "cookie-bite";
                break;
            case "Dairy, Eggs & Cheese":
                icon = "egg";
                break;
            case "Deli":
                icon = "drumstick-bite";
                break;
            case "Frozen Foods":
                icon = "ice-cream";
                break;
            case "Produce":
                icon = "apple-alt";
                break;
            case "International Cuisine":
                icon = "globe-asia";
                break;
            case "Meat & Seafood":
                icon = "fish";
                break;
            case "Miscellaneous":
                icon = "box-open";
                break;
            case "Paper Products":
                icon = "copy";
                break;
            case "Cleaning Supplies":
                icon = "broom";
                break;
            case "Health & Beauty":
                icon = "bath";
                break;
            case "Pet Care":
                icon = "paw";
                break;
            case "Pharmacy":
                icon = "prescription-bottle";
                break;
        }

        // this.setState({ cardIcon: icon })
        return icon;

    }

    addOne = id => {
        API.addOrRemoveOneFromItem({
            id: id,
            quantity: this.props.quantity + 1
        })
            .then(res => {
                console.log(res)
                this.props.listPantry(this.props.home_id)
            })
            .catch(err => {
                console.log(err)
            });
    }

    removeOne = id => {
        if (this.props.quantity > 0) {
            API.addOrRemoveOneFromItem({
                id: id,
                quantity: this.props.quantity - 1
            })
                .then(res => {
                    console.log(res)
                    this.props.listPantry(this.props.home_id)
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            alert("This item is at 0");
        }

    }

    render() {

        return (
            <tr>
                <td><i className={`fas fa-${this.iconGenerator(this.props.item_type)}`}></i></td>
                <td>{this.props.item_name}</td>
                <td>{this.props.item_type}</td>
                <td>Date In: <Moment format="MMMM DD">{this.props.date_in}</Moment></td>
                <td><button type="button" className="btn btn-danger" onClick={() => this.removeOne(this.props.id)}><i className="fas fa-minus"></i></button></td>
                <td>Quantity: <span className="badge badge-secondary badge-pill">{this.props.quantity}</span></td>
                <td><button type="button" className="btn btn-success" onClick={() => this.addOne(this.props.id)}><i className="fas fa-plus"></i></button></td>
            </tr>
        )

        // return (
        //     <li className="list-group-item d-flex justify-content-between align-items-left">
        //         <span><i className={`fas fa-${this.iconGenerator(this.props.item_type)}`}></i></span>
        //         {this.props.item_name}
        //         <span>Date In: <Moment format="MMMM DD">{this.props.date_in}</Moment></span>
        //         <button type="button" className="btn btn-danger" onClick={() => this.removeOne(this.props.id)}><i className="fas fa-minus"></i></button>
        //         <span>Quantity: <span className="badge badge-secondary badge-pill">{this.props.quantity}</span></span>
        //         <button type="button" className="btn btn-success" onClick={() => this.addOne(this.props.id)}><i className="fas fa-plus"></i></button>
        //     </li>
        // )
    }
}

export default PantryItem;