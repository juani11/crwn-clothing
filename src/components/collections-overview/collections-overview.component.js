import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionForPreview } from '../../redux/shop/shop.selector';
import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({ match, collections }) => {
    console.log(match.path);
    return (
        <div className="collections-overview">
            {
                collections
                    .map(({ id, ...rest }) => <CollectionPreview key={id} {...rest} />)
            }
        </div>);
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview
})

export default connect(mapStateToProps)(CollectionsOverview);