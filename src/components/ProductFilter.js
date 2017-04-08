import React, { Component } from 'react';
import '../css/ProductFilter.css';

/**
 * Input text field, to filter products by title.
 * Attributes:
 * @prop  {Function}    setFilterValue      Callback function to pass the string input by the user to the parent component
 */
class ProductFilter extends Component {
    _handleKeyUp(event) {
        this.props.setFilterValue(this._filter.value);
    }

    render() {
        return (
            <form className="gc-product-filter">
                <input placeholder="Type to filter products"
                    ref={filter => this._filter = filter}
                    onKeyUp={this._handleKeyUp.bind(this)} />
            </form>
        );
    }
}

export default ProductFilter;
