import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';
import WithSpiner from '../../components/with-spinner/with-spinner.component';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selector';

const CollectionsOverviewWithSpinner = WithSpiner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpiner(CollectionPage);
class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart()
    }

    render() {
        const { match, isCollectionFetching, isCollectionsLoaded } = this.props;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                    render={
                        (props) =>
                            <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
                    } />
                <Route path={`${match.path}/:collectionId`}
                    render={
                        (props) =>
                            <CollectionPageWithSpinner isLoading={!isCollectionsLoaded} {...props} />
                    } />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})
const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})
export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);