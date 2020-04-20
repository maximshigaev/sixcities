import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Login from './login.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Interactions with user invoke appropriate callbacks with right values`, () => {
    it(`default action of form after form submission is prevented`, () => {
        const preventDefault = jest.fn((...args) => [...args]);

        const login = shallow(<Login onSubmit={() => {}} />);

        const form = login.find(`form`);
        form.simulate(`submit`, {
            preventDefault
        });

        expect(preventDefault).toHaveBeenCalledTimes(1);
        expect(preventDefault.mock.calls[0][0]).toEqual(undefined);
    });

    it(`form can't be sent if the email-input doesn't have value even if the password-input has value`, () => {
        const onSubmit = jest.fn();

        const login = shallow(<Login onSubmit={onSubmit} />);

        const passwordInput = login.find(`input`).at(1);
        passwordInput.simulate(`change`, {target: {value: `12345`}});

        const button = login.find(`button`);
        button.simulate(`click`);

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it(`form can't be sent if the password-input doesn't have value even if the email-input has value`, () => {
        const onSubmit = jest.fn();

        const login = shallow(<Login onSubmit={onSubmit} />);

        const emailInput = login.find(`input`).at(0);
        emailInput.simulate(`change`, {target: {value: `example@mail.ru`}});

        const button = login.find(`button`);
        button.simulate(`click`);

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });
});

describe(`Corresponding variables are equal to the values of password and email inputs`, () => {
    it(`the email-input should be controlled element`, () => {
        const login = shallow(<Login onSubmit={() => {}} />);

        const emailInput = login.find(`input`).at(0);
        emailInput.simulate(`change`, {target: {value: `example@mail.ru`}});

        const element = <input className="login__input form__input" name="email" value="example@mail.ru" required />;

        expect(login.containsMatchingElement(element)).toEqual(true);
    });

    it(`the password-input should be controlled element`, () => {
        const login = shallow(<Login onSubmit={() => {}} />);

        const passwordInput = login.find(`input`).at(1);
        passwordInput.simulate(`change`, {target: {value: `12345`}});

        const element = <input className="login__input form__input" name="password" value="12345" required />;

        expect(login.containsMatchingElement(element)).toEqual(true);
    });

    it(`when form with valid fields is sent, it is sent with the right values`, () => {
        const onSubmit = jest.fn(); 

        const login = shallow(<Login onSubmit={onSubmit} />);

        const emailInput = login.find(`input`).at(0);
        emailInput.simulate(`change`, {target: {value: `example@mail.ru`}});

        const passwordInput = login.find(`input`).at(1);
        passwordInput.simulate(`change`, {target: {value: `12345`}});

        const form = login.find(`form`);
        form.simulate(`submit`, {preventDefault: () => {}});

        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenNthCalledWith(1, `example@mail.ru`, `12345`);
    });
});
