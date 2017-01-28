import React from 'react';
import { Animated, Dimensions } from 'react-native';
import { HIDDEN, VISIBLE } from './animation-state';

const limelightSize = 750;
const limelightMargin = (Dimensions.get('window').width - limelightSize) / 2;

/**
 * A white circle that appears from the top of
 * the screen when an item is focused
 */
const Limelight = ({color, visibility}) => (
  <Animated.View
    style={{
      position: 'absolute',
      left: limelightMargin,
      width: limelightSize,
      height: limelightSize,
      borderRadius: limelightSize / 2,
      backgroundColor: color,
      transform: [
        {
          translateY: visibility.interpolate({
            inputRange: [HIDDEN, VISIBLE],
            outputRange: [-limelightSize, -(limelightSize / 2) - 50]
          })
        }
      ]
    }}
  />
);

export default Limelight;
