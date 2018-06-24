import React from 'react';

import styles from './HomePage.module.scss';

import image from './irasshaimase.png';

function HomePage() {
  return (
    <div>
      <img className={styles.Image} src={image} alt="irasshaimase" />
    </div>
  );
}

export default HomePage;
