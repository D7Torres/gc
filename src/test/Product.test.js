import React from 'react';
import Product from '../components/Product.js';
import {shallow} from 'enzyme';

const sampleTitle = 'My title';
const sampleDescription = 'A sample description';
const titleSelector = '.gc-product > a';
const descriptionSelector = 'p.gc-description';
const visibleStateKey = 'visibleDescription';
const selectedClass = 'gc-selected';

// Render a product
const product = shallow(
    <Product title={sampleTitle} description={sampleDescription} />
);

describe('The title', () => {
    let titleElem;

    beforeAll(() => {
        titleElem = product.find(titleSelector);
    });

    it('Renders with the value passed on the component attribute', () => {
        expect(titleElem.text()).toBe(sampleTitle);
    });

    it('Is not bold by default', () => {
        expect(titleElem.hasClass(selectedClass)).toBeFalsy();
    });

    it('Becomes bold when clicked, and regular when clicked again', () => {
        titleElem.simulate('click');
        titleElem = product.find(titleSelector);
        expect(titleElem.hasClass(selectedClass)).toBeTruthy();

        titleElem.simulate('click');
        titleElem = product.find(titleSelector);
        expect(titleElem.hasClass(selectedClass)).toBeFalsy();
    });
});

describe('The description', () => {
    let descriptionElem;

    beforeAll(() => {
        descriptionElem = product.find(descriptionSelector);
    });

    it('Renders with the value passed on the component attribute', () => {
        expect(descriptionElem.text()).toBe(sampleDescription);
    });

    it('Is not visible by default', () => {
        expect(product.state(visibleStateKey)).toBeFalsy();
    });

    it('Becomes visible when title is clicked', () => {
        product.find(titleSelector).simulate('click');
        expect(product.state(visibleStateKey)).toBeTruthy();
    });
});