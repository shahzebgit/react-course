import React from 'react';
import { connect } from 'react-redux';

import { createStructuredSelector}  from 'reselect';
import PreviewCollection from '../preview-collection/preview-collection'
import { selectCollections } from "../../Redux/shop/shop.selector";

import './collection-overview.styles.scss';

const CollectionsOverview =({collections})=>( 
    <div className="collection-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
        <PreviewCollection key={id} {...otherCollectionProps} />
      ))}
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollections,
  });

export default connect(mapStateToProps)(CollectionsOverview);