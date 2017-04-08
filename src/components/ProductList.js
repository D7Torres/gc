import React, { Component } from 'react';
import Product from './Product'
import ProductFilter from './ProductFilter'
import '../css/ProductList.css';

/**
 * Show the list of products of a selected category.
 * Attributes:
 * @prop  {Function}    selectedCategoryId      ID of the category which products will be displayed
 */
class ProductList extends Component {
    constructor(props) {
        super(props);
        this.GOUSTO_API_PRODUCTS = 'https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&image_sizes[]=400&period_id=120';

        /**
         * @property  {Object[]}    products            Products retrieved from Gousto, which will be filtered by
         *                                              category and can be filter by title containing a substring
         * @property  {String}      filterValue         String input by the user to filter products by title
         */
        this.state = {
            products: [],
            filterValue: ''
        };
    }

    /**
     * Filter the array of products to keep only the ones that belong to a specific category.
     * If no category is selected, show all the products.
     * @param  {Object[]}   products    The list of products to be filtered
     * @param  {String}     categoryId  The ID of a category
     * @return {Object[]}               Array of products filtered by the category passed
     */
    _filterProductsByCategoryId(products, categoryId) {
        if (!categoryId) {
            return products;
        }

        function productBelongsToCategory(product, categoryId) {
            return product.categories.some(category => category.id === categoryId);
        }

        return products.filter(product => productBelongsToCategory(product, categoryId));
    }

    /**
     * Filter the array of products to keep only the ones which title containins the string
     * input by the user. It is not case sensitive.
     * @param  {Object[]}   products        The list of products to be filtered
     * @param  {String}     filterValue     The string inputted by the user
     * @return {Object[]}                   Array of products filtered by the string passed
     */
    _filterProductsByTitle(products, filterValue) {
        //Some optimization
        if (filterValue === '') {
            return products;
        }

        filterValue = filterValue.toLowerCase()
        return products.filter(product => product.title.toLowerCase().includes(filterValue));
    }

    _setFilterValue(filterValue) {
        this.setState({filterValue});
    }

    async componentWillMount() {
        // Get the products from Gousto API using native JS Fetch
        try {
            let response = await fetch(this.GOUSTO_API_PRODUCTS);
            response =  await response.json();
            this.setState({products: response.data});
        } catch (err) {
            console.error('An error ocurred while fetching the products', err);
        }
    }

    render() {
        // Filter products by selected category and by the input filter
        let products = this._filterProductsByCategoryId(this.state.products, this.props.selectedCategoryId);
        products = this._filterProductsByTitle(products, this.state.filterValue);

        return (
            <div className="gc-product-list">
                <ProductFilter setFilterValue={this._setFilterValue.bind(this)}/>
                <ul>
                    {products.map(product => (
                        <li key={product.id}>
                            <Product title={product.title} description={product.description} />
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ProductList;