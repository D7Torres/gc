import React, { Component } from 'react';
import Categories from './Categories'
import ProductList from './ProductList'

/**
 * Root component.
 */
class App extends Component {
    constructor() {
        super();

        /**
         * @property  {String}      selectedCategoryId    ID of the category selected by the child component `Categories`
         */
        this.state = {
            selectedCategoryId: null
        }
    }

    _selectCategory(selectedCategoryId) {
        this.setState({selectedCategoryId});
    }

    render() {
        return (
            <div className="gc-app">
                <Categories selectCategory={this._selectCategory.bind(this)} />
                <ProductList selectedCategoryId={this.state.selectedCategoryId} />
            </div>
        );
    }
}

export default App;
