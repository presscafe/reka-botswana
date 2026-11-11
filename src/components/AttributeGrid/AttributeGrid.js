import React from 'react';

import Attribute from '../Attribute';

import * as styles from './AttributeGrid.module.css';

const AttributeGrid = (props) => {
  return (
    <div className={styles.root}>
      <Attribute
        icon={'delivery'}
        title={'free Gaborone collection'}
        subtitle={'Every order ships collectable — free of charge'}
      />
      <Attribute
        icon={'cycle'}
        title={'7-day returns'}
        subtitle={'Not right? Return within 7 days of collection'}
      />
      <Attribute
        icon={'question'}
        title={'order by WhatsApp'}
        subtitle={'Confirm availability and pay your way'}
      />
    </div>
  );
};

export default AttributeGrid;
