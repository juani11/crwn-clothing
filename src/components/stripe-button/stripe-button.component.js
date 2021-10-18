import React from 'react';

import StripeCheckout from 'react-stripe-checkout';

const onToken = () => { }

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51JluWCLZA6aCaWpv5G8sFOGqkLe8RwWyI8eigc7rI1i4aGQZHEpQMYwS2EJwPxsGV3vxjq4lQqtfu6nr1N1LOSKD00tWYMkmAW';
    return (
        <StripeCheckout
            label='Pay Now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i.Cuz.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;