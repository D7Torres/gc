# Gousto test
by David Torres (david7torres@gmail.com)

## How to use it
* First, **install the dependencies:** Go inside the `gousto-challenge` directory and run `npm install`.
* To **start the application**, run `npm run start`. A browser window will open and you will see the application. If it does not open, just open it yourself and type `http://localhost:3000/`. This way of starting the app is intended for a development environment, for a production environment you have to build it and then deploy the build, but that will not be covered in this document.
* You can **test the application** by running `npm run test`. However, I only wrote tests for one component (<Product />). There are two warnings I did not manage to solve (I did not find almost any information related, I believe it could be some recent dependency update). In any case, all the tests will run. I used [Jest](https://facebook.github.io/jest/) to build the suit of tests.


## Components
The image below features the hierarchy of components used to create the application:
[![components.png](https://s12.postimg.org/ub7zk3kil/components.png)](https://postimg.org/image/jbms8hu3d/)

## Components messages
The components interact with each other following the next classic React pattern:
* To communicate with a child component, the message is passed via the attributes of the child component.
* To communicate with a parent component, the parent passes a function to the child via the attributes of the child component. The child component calls back that function whith the message when necessary.

Some of the interactions between the components can be seen in the image below:
[![Components messages.png](https://s2.postimg.org/vt1ol0dl5/Components_messages.png)](https://postimg.org/image/7pawwpv45/)


## Components documentation
### <App />
Root component.

### <Categories />
Retrieve the categories from Gousto API and display them, allowing to select them.
##### &nbsp;&nbsp;&nbsp;&nbsp;Attributes:
 * {Function} **selectCategory:** Callback function to pass the selected category to the parent component
##### &nbsp;&nbsp;&nbsp;&nbsp;State:
* {Object[]} **categories:** Categories retrieved from Gousto
* {String} **selectedCategory:** ID of the selected category

### <ProductList />
Show the list of products of a selected category.
##### &nbsp;&nbsp;&nbsp;&nbsp;Attributes:
* {Function} **selectedCategoryId:** ID of the category which products will be displayed
##### &nbsp;&nbsp;&nbsp;&nbsp;State:
* {Object[]} **products:** Products retrieved from Gousto, which will be filtered by category and can be filter by title containing a substring
* {String} **filterValue:** String input by the user to filter products by title

### <ProductFilter />
Input text field, to filter products by title.
##### &nbsp;&nbsp;&nbsp;&nbsp;Attributes:
* {Function} **setFilterValue:** Callback function to pass the string input by the user to the parent component

### <Product />
Display a product, by default the description is hidden, and will toggle (display/hide) when the title of the product is clicked.
##### &nbsp;&nbsp;&nbsp;&nbsp;Attributes:
* {String}  **title:** Title of the product
* {String}  **description:** Description of the product
##### &nbsp;&nbsp;&nbsp;&nbsp;State:
* {Boolean} **visibleDescription:** Indicates whether the description must be displayed or hidden
