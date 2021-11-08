import React, { useState } from 'react';
import './sign-in.styles.scss'

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

const SignIn = ({ googleSignInStart, emailSignInStart }) => {

    const [userCredentialas, setUserCredentialas] = useState({
        email: '',
        password: ''
    })

    const { email, password } = userCredentialas;

    const handleSubmit = async e => {
        e.preventDefault();

        emailSignInStart(email, password)

    }

    const handleChange = e => {
        const { name, value } = e.target;

        setUserCredentialas({ ...userCredentialas, [name]: value });
    }

    return <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
            <FormInput
                name="email"
                type="email"
                value={email}
                handleChange={handleChange}
                label="email"
                required
            />
            <FormInput
                name="password"
                type="password"
                value={password}
                handleChange={handleChange}
                required
                label="password"
            />
            <div className="buttons">
                <CustomButton >SIGN IN</CustomButton>
                <CustomButton
                    type="button"
                    isGoogleSignIn={true}
                    onClick={googleSignInStart}>
                    SIGN IN WITH GOOGLE
                </CustomButton>

            </div>
        </form>
    </div>;

}
const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})
export default connect(null, mapDispatchToProps)(SignIn);