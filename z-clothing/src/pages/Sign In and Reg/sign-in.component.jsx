import React from 'react'

import SignIn from '../../components/sign-in/sign-in-components';
import SignUp from '../../components/sign-up/sign-up';
import './sign-in.styles.scss';


const SignInPage =() =>(
    <div className='sign-in-page'>
    <SignIn />
    <SignUp />
    </div>
);

export default SignInPage;