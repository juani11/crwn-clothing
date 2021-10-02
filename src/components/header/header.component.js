import React from 'react';
import './header.styles.scss'
import { ReactComponent as Logo } from '../../assets/crown.svg'

import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ({ currentUser }) => {


    return (
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo></Logo>
            </Link>
            <div className="options">
                <Link className="option" to="/shop"> Shop
                </Link>
                <Link className="option" to="/contact"> Contact
                </Link>
                {currentUser ?
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="option" to="/signin">SIGN IN</Link>
                }
            </div>
        </div>
    );
}

export default Header;