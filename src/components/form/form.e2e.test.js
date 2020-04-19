import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Form from './form.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Interactions with user invoke appropriate callbacks with right values`, () => {
    it(`default action of form after form submission is prevented`, () => {
        const preventDefault = jest.fn();
        const form = shallow(<Form onSubmit={() => {}} />);

        form.simulate(`submit`, {
            preventDefault
        });

        expect(preventDefault).toHaveBeenCalledTimes(1);
    });

    it(`form can't be send if the length of the value of textarea is less than the minimum length even if the rating
        is set`,
    () => {
        const onSubmit = jest.fn();
        const form = shallow(<Form onSubmit={onSubmit} />);

        const mockTextareaChangeEvt = {target: {value: `Seven Seven Seven Seven Seven Seven Seven Seven a`}};

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, mockTextareaChangeEvt);

        const input = form.find(`input`).at(0);
        input.simulate(`change`, {target: {value: 5}});

        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it(`form can't be send if the length of the value of textarea is greater than the maximum length even if the
        rating is set`,
    () => {
        const onSubmit = jest.fn();
        const form = shallow(<Form onSubmit={onSubmit} />);

        const mockTextareaChangeEvt = {target: {value: `Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen
            Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen
            Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen Seventeen
            Seventeen Seventeen Seventeen Seventeen a`
        }};

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, mockTextareaChangeEvt);

        const input = form.find(`input`).at(0);
        input.simulate(`change`, {target: {value: 5}});

        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it(`form can't be send if the rating is not set even if the length of the value of textarea is less than the
        maximum length and greater than the mininun length`,
    () => {
        const onSubmit = jest.fn();
        const form = shallow(<Form onSubmit={onSubmit} />);

        const mockTextareaChangeEvt = {target:
            {value: `Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven`}};

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, mockTextareaChangeEvt);

        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });
});

describe(`Corresponding variables are equal to the values of input and textarea`, () => {
    it(`textarea should be the controlled element`, () => {
        const form = shallow(<Form onSubmit={() => {}} />);

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, {target: {value: `Max`}});

        const element = (<textarea className="reviews__textarea form__textarea" id="review" name="review"
            value='Max'></textarea>);

        expect(form.containsMatchingElement(element)).toEqual(true);
    });

    it(`rating inputs when changed should set the corresponding variable as their values respectively`, () => {
        const onSubmit = jest.fn((...args) => [...args]);
        const form = shallow(<Form onSubmit={onSubmit} />);

        const input = form.find(`input`).at(1);
        input.simulate(`change`, {target: {value: 4}});

        const mockTextareaChangeEvt = {target:
            {value: `Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven`
        }};

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, mockTextareaChangeEvt);

        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit.mock.calls[0][0]).toEqual(4);
    });

    it(`when form with valid fields is sent, it is sent with the right values`, () => {
        const onSubmit = jest.fn((...args) => [...args]);
        const form = shallow(<Form onSubmit={onSubmit} />);

        const input = form.find(`input`).at(2);
        input.simulate(`change`, {target: {value: 3}});

        const textareaValue = `Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven`;

        const textarea = form.find(`textarea`);
        textarea.simulate(`change`, {target: {value: textareaValue }});

        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit.mock.calls[0][0]).toEqual(3);
        expect(onSubmit.mock.calls[0][1]).toEqual(textareaValue);
    });
});
