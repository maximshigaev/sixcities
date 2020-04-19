import React from 'react';
import Enzyme,{shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {Filter} from './filter.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Interactions with user invokes appropriate callbacks`, () => {
    it(`when user clicks on the span the first time, this should open the menu`, () => {
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={() => {}}
            currentSorting='Popular'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);

        const markup = "<h2 class=\"visually-hidden\">Places</h2><b class=\"places__found\">10 places to stay in Amsterdam</b><form class=\"places__sorting\" action=\"#\" method=\"get\"><span class=\"places__sorting-caption\">Sort by </span><span class=\"places__sorting-type\" tabindex=\"0\" title=\"Close the menu\">Popular<svg class=\"places__sorting-arrow\" width=\"7\" height=\"4\"><use xlink:href=\"#icon-arrow-select\"></use></svg></span><ul class=\"places__options places__options--custom places__options--opened\"><li class=\"places__option places__option--active\" tabindex=\"0\">Popular</li><li class=\"places__option\" tabindex=\"0\">Price: low to high</li><li class=\"places__option\" tabindex=\"0\">Price: high to low</li><li class=\"places__option\" tabindex=\"0\">Top rated first</li></ul></form>";

        expect(filter.html()).toEqual(markup);
    });

    it(`when user clicks on the span the second time, this should close the menu`, () => {
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={() => {}}
            currentSorting='Popular'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);
        span.simulate(`click`);

        const markup = "<h2 class=\"visually-hidden\">Places</h2><b class=\"places__found\">10 places to stay in Amsterdam</b><form class=\"places__sorting\" action=\"#\" method=\"get\"><span class=\"places__sorting-caption\">Sort by </span><span class=\"places__sorting-type\" tabindex=\"0\" title=\"Open the menu\">Popular<svg class=\"places__sorting-arrow\" width=\"7\" height=\"4\"><use xlink:href=\"#icon-arrow-select\"></use></svg></span></form>";
        
        expect(filter.html()).toEqual(markup);
    });

    it(`when user clicks on the li corresponding to the Top rated first sorting option, this involes the sortBy
        callback with the right value`,
    () => {
        const sortBy = jest.fn();
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={sortBy}
            currentSorting='Popular'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);

        const li = filter.find(`.places__option`).at(3);
        li.simulate(`click`);

        expect(sortBy).toHaveBeenCalledTimes(1);
        expect(sortBy).toHaveBeenNthCalledWith(1, `Top rated first`);
    });

    it(`when user clicks on the li corresponding to the Price: high to low sorting option, this involes the sortBy
        callback with the right value`,
    () => {
        const sortBy = jest.fn();
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={sortBy}
            currentSorting='Popular'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);

        const li = filter.find(`.places__option`).at(2);
        li.simulate(`click`);

        expect(sortBy).toHaveBeenCalledTimes(1);
        expect(sortBy).toHaveBeenNthCalledWith(1, `Price: high to low`);
    });

    it(`when user clicks on the li corresponding to the Price: low to high sorting option, this involes the sortBy
        callback with the right value`,
    () => {
        const sortBy = jest.fn();
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={sortBy}
            currentSorting='Popular'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);

        const li = filter.find(`.places__option`).at(1);
        li.simulate(`click`);

        expect(sortBy).toHaveBeenCalledTimes(1);
        expect(sortBy).toHaveBeenNthCalledWith(1, `Price: low to high`);
    });

    it(`when user clicks on the li corresponding to the Popular sorting option, this involes the sortBy callback with
        the right value`,
    () => {
        const sortBy = jest.fn();
        const filter = shallow(<Filter offersLength={10} activeCity='Amsterdam' sortBy={sortBy}
            currentSorting='Price: low to high'
        />);

        const span = filter.find(`.places__sorting-type`);
        span.simulate(`click`);

        const li = filter.find(`.places__option`).at(0);
        li.simulate(`click`);

        expect(sortBy).toHaveBeenCalledTimes(1);
        expect(sortBy).toHaveBeenNthCalledWith(1, `Popular`);
    });
});
