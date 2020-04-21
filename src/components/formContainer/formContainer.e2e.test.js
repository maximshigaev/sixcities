import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {FormContainer} from './formContainer.jsx';

Enzyme.configure({adapter: new Adapter()});

describe(`Interaction with user invokes appropriate callbacks`, () => {
    it(`resetReviewError callback should be invoked right after the FormContainer component will be mounted`, () => {
        const resetReviewError = jest.fn((...args) => [...args]);

        mount(<FormContainer fetchReview={() => {}} resetReviewError={resetReviewError} isReviewLoading={false}
                isReviewError={false} isLoggedIn={true} hasUserReview={false} id={2}
            />
        );

        expect(resetReviewError).toHaveBeenCalledTimes(1);
        expect(resetReviewError.mock.calls[0][0]).toEqual(undefined);
    });

    it(`the submission of form should invoke fetchReview callback one time with the right values`, () => {
        const fetchReview = jest.fn();

        const formContainer = mount(
            <FormContainer fetchReview={fetchReview} resetReviewError={() => {}} isReviewLoading={false}
                isReviewError={false} isLoggedIn={true} hasUserReview={false} id={2}
            />
        );

        const input = formContainer.find(`input`).at(2);
        input.simulate(`change`, {target: {value: 3}});

        const textareaValue = `Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven Seven`;
        const textarea = formContainer.find(`textarea`);
        textarea.simulate(`change`, {target: {value: textareaValue }});

        const form = formContainer.find(`form`);
        form.simulate(`submit`, {preventDefault: () => {}});

        expect(fetchReview).toHaveBeenCalledTimes(1);
        expect(fetchReview).toHaveBeenNthCalledWith(1, {rating: 3, comment: textareaValue}, 2);
    });
});
