// @flow

import React, {PropTypes, Component} from 'react';
import { Animated } from 'react-native';
import { HIDDEN, VISIBLE, FOCUSED } from './animation-state';

type GridCellPropTypes = {
  row: number,
  col: number,
  size: number,
  gutter: number
}

export default class GridCell extends React.Component {
  propTypes: GridCellPropTypes;

  render() {
    const { row, col, size, gutter, animation} = this.props;
    const project = (hidden, visible, focused) => animation.interpolate({
      inputRange:  [HIDDEN, VISIBLE, FOCUSED],
      outputRange: [hidden, visible, focused]
    });

    const top = (gutter) + (row * (size + gutter / 2));
    const left = (gutter / 2) + (col * (size + gutter));
    const translateX = project(0,   0,   -((size + gutter) * (col - 1)));
    const translateY = project(100, 0,   -((size + gutter / 2) * (row - 1)) - gutter);
    const opacity    = project(0,   1,   1);
    const scale      = project(1,   1,   2);
    const style = {
      top,
      left,
      opacity,
      position: 'absolute',
      transform: [
        {translateX},
        {translateY},
        {scale}
      ]
    };

    return (
      <Animated.View style={style}>
        {this.props.children}
      </Animated.View>
    )
  }
}
