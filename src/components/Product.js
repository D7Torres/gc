import React, { Component } from 'react';
import '../css/Product.css';

/**
 * Display a product, by default the description is hidden, and will toggle (display/hide)
 * when the title of the product is clicked.
 * Attributes:
 * @prop  {String}  title           Title of the product
 * @prop  {String}  description     Description of the product
 */
class Product extends Component {
    constructor(props) {
        super(props);

        /**
         * @property  {Boolean}     visibleDescription  Indicates whether the description must be displayed or hidden
         */
        this.state = {
            visibleDescription: false
        };
    }

    _handleClick(event) {
        // Prevent the page to scroll up due to href='#'
        if (event) {
            event.preventDefault();
        }

        // Make description visible if it was invisible and viceversa
        this.setState({
            visibleDescription: !this.state.visibleDescription
        });
    }

    render() {
        let selectedClass = this.state.visibleDescription ? 'gc-selected' : '';
        let visibleClass = this.state.visibleDescription ? '' : 'gc-invisible';

        return (
            <article className="gc-product">
                <a className={selectedClass} href='#' onClick={this._handleClick.bind(this)}>{this.props.title}</a>
                <p className={"gc-description " + visibleClass}>{this.props.description}</p>
            </article>
        );
    }
}

export default Product;
