import React from 'react';
import { Animated } from 'react-native';

/**
 * A colored background that fades in when
 * a cell is focused
 */
const Background = ({color, visibility}) => (
  <Animated.View
    style={{
      opacity: visibility,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      backgroundColor: color
    }}
  />
);

export default Background;
