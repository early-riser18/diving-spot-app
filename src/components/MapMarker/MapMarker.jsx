import React, { Component, useState, UseEffect } from "react";
import styles from './MapMarker.module.scss';

export const MapMarker = ({ src, idRef, onClick }) => (
    <div style={{ cursor: "pointer" }} onClick={onClick}>
      <img id={`M${idRef}`} className={styles.pin} src={src} alt="" />
    </div>
   
  );