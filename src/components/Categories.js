import React, { Component } from 'react';
import '../css/Categories.css';

/**
 * Retrieve the categories from Gousto API and display them, allowing to select them.
 * Attributes:
 * @prop  {Function}    selectCategory      Callback function to pass the selected category to the parent component
 */
class Categories extends Component {
    constructor(props) {
        super(props);
        this.GOUSTO_API_CATEGORIES = 'https://api.gousto.co.uk/products/v2.0/categories';

        /**
         * @property  {Object[]}    categories          Categories retrieved from Gousto
         * @property  {String}      selectedCategory    ID of the selected category
         */
        this.state = {
            categories: [],
            selectedCategory: ''
        };
    }

    _handleClick(selectedCategory) {
        // If the selected category is selected again, unselect it;
        selectedCategory = selectedCategory === this.state.selectedCategory ? null : selectedCategory;

        this.setState({selectedCategory});
        this.props.selectCategory(selectedCategory);
    }

    async componentWillMount() {
        // Get the categories from Gousto API using native JS Fetch
        try {
            let response = await fetch(this.GOUSTO_API_CATEGORIES);
            response =  await response.json();
            this.setState({categories: response.data});
        } catch (err) {
            console.error('An error ocurred while fetching the categories', err);
        }
    }

    render() {
        return (
            <nav className="gc-categories">
                <ul>
                    {this.state.categories.map(category => (
                        <li key={category.id}>
                            <a className={category.id === this.state.selectedCategory ? "selected" : ""}
                                onClick={this._handleClick.bind(this, category.id)}>
                                {category.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}

export default Categories;
