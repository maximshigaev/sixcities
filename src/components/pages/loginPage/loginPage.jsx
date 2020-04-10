import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';

import Header from '../../header/header.jsx';
import {fetchAuth} from '../../../actions.js';
import Spinner from '../../spinner/spinner.jsx';

class LoginPage extends React.PureComponent {
    state = {
        email: ``,
        password: ``
    }

    static propTypes = {
        fetchAuth: PropTypes.func.isRequired,
        isLoggedIn: PropTypes.bool.isRequired,
        isAuthLoading: PropTypes.bool.isRequired
    }

    emailInputChangeHandler = (evt) => {
        this.setState({
            email: evt.target.value
        });
    }

    passwordInputChangeHandler = (evt) => {
        this.setState({
            password: evt.target.value
        });
    }

    formSubmitHandler = (evt, email, password) => {
        evt.preventDefault();
        this.props.fetchAuth({
            email,
            password
        })
    }

    render() {
        const {email, password} = this.state;
        const {isLoggedIn, isAuthLoading} = this.props;

        if(isLoggedIn) {
            return <Redirect to="/" />
        }

        if(isAuthLoading) {
            return (
                <div className="page page--gray page--login">
                    <Header />
                    <Spinner />
                </div>
            );
        }

        return (
            <div className="page page--gray page--login">
                <Header />

                <main className="page__main page__main--login">
                    <div className="page__login-container container">
                        <section className="login">
                            <h1 className="login__title">Sign in</h1>
                            <form className="login__form form" action="#" method="post"
                                onSubmit={(evt) => this.formSubmitHandler(evt, email, password)}
                            >
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label className="visually-hidden">E-mail</label>
                                    <input className="login__input form__input" type="email" name="email"
                                        placeholder="Email" required="" value={email}
                                        onChange={this.emailInputChangeHandler}
                                    />
                                </div>
                                <div className="login__input-wrapper form__input-wrapper">
                                    <label className="visually-hidden">Password</label>
                                    <input className="login__input form__input" type="password" name="password"
                                        placeholder="Password" required="" value={password}
                                        onChange={this.passwordInputChangeHandler}
                                    />
                                </div>
                                <button className="login__submit form__submit button" type="submit">Sign in</button>
                            </form>
                        </section>
                        <section className="locations locations--login locations--current">
                            <div className="locations__item">
                                <a className="locations__item-link" href="#">
                                    <span>Amsterdam</span>
                                </a>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        );
    }
}

const mapStateToProps = ({isLoggedIn, isAuthLoading}) => {
    return {
        isLoggedIn,
        isAuthLoading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAuth: (email, password) => dispatch(fetchAuth(email, password))
    } 
}

export {LoginPage};
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
