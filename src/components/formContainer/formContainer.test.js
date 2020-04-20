import React from 'react';
import renderer from 'react-test-renderer';

import {FormContainer} from './formContainer.jsx';

describe(`Correctly renders the FormContainer component`, () => {
    it(`when isLoggedIn property is equal false and hasUserReview property is equal false`, () => {
        const tree = renderer.create(
            <FormContainer fetchReview={() => {}} resetReviewError={() => {}} isReviewLoading={false}
                isReviewError={false} isLoggedIn={false} hasUserReview={false} id={2}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when hasUserReview property is equal true and isLoggedIn property is equal true`, () => {
        const tree = renderer.create(
            <FormContainer fetchReview={() => {}} resetReviewError={() => {}} isReviewLoading={false}
                isReviewError={false} isLoggedIn={true} hasUserReview={true} id={2}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isReviewLoading property is equal true, hasUserReview property is equal false and isLoggedIn property is
        equal true`,
    () => {
        const tree = renderer.create(
            <FormContainer fetchReview={() => {}} resetReviewError={() => {}} isReviewLoading={true}
                isReviewError={false} isLoggedIn={true} hasUserReview={false} id={2}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isReviewError property is equal true, hasUserReview property is equal false, isLoggedIn property is equal
        true and isReviewLoading property is equal false`,
    () => {
        const tree = renderer.create(
            <FormContainer fetchReview={() => {}} resetReviewError={() => {}} isReviewLoading={false}
                isReviewError={true} isLoggedIn={true} hasUserReview={false} id={2}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`when isReviewError, hasUserReview, isReviewLoading properties are equal false and isLoggedIn property is equal
        true`,
    () => {
        const tree = renderer.create(
            <FormContainer fetchReview={() => {}} resetReviewError={() => {}} isReviewLoading={false}
                isReviewError={false} isLoggedIn={true} hasUserReview={false} id={2}
            />)
        .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
