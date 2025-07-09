'use client';

import React from 'react';
import styles from '../../styles/ScrollToTopButton.module.css';


export default function ScrollToTopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className={styles.scrollButton} onClick={scrollToTop}>
       <img src="/arrow.png" className={styles.icon} />
    </button>
  );
}
