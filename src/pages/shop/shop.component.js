import React from 'react';
import { Route } from 'react-router-dom';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component';

import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';
import WithSpiner from '../../components/with-spinner/with-spinner.component';

const CollectionsOverviewWithSpinner = WithSpiner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpiner(CollectionPage);
class ShopPage extends React.Component {
    constructor() {
        super();

        this.state = {
            loading: true
        }
    }
    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collection');

        collectionRef.get()
            .then(querySnapshot => {
                const collectionsMap = convertCollectionsSnapshotToMap(querySnapshot);
                updateCollections(collectionsMap);
                this.setState({ loading: false })
            });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;

        return (
            <div className="shop-page">
                <Route exact path={`${match.path}`}
                    render={
                        (props) =>
                            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
                    } />
                <Route path={`${match.path}/:collectionId`}
                    render={
                        (props) =>
                            <CollectionPageWithSpinner isLoading={loading} {...props} />
                    } />
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})
export default connect(null, mapDispatchToProps)(ShopPage);