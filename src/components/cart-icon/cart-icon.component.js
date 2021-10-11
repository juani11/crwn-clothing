import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { toogleCartHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './cart-icon.styles.scss';

const CartIcon = ({ toogleCartHidden, itemCount }) => {
    return (
        <div className="cart-icon" onClick={toogleCartHidden}>
            <ShoppingIcon className="shopping-icon" />
            <span className="item-count">{itemCount}</span>
        </div>
    );
}

const matchDispatchToProps = dispatch => ({
    toogleCartHidden: () => dispatch(toogleCartHidden())
})

const mapStateToProps = state => ({
    itemCount: selectCartItemsCount(state)
})

export default connect(mapStateToProps, matchDispatchToProps)(CartIcon);