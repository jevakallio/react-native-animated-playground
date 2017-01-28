// @flow
import React, {PropTypes, Component} from 'react';
import {
  View,
  Image,
  Animated,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';

import icons from './icons';
import Grid from './grid';
import GridCell from './grid-cell';
import Title from './title';
import Background from './background';
import Limelight from './limelight';
import { HIDDEN, VISIBLE, FOCUSED } from './animation-state';

const {
  delay,
  spring,
  stagger,
  sequence,
  parallel
} = Animated;

const COLUMNS = 3;
const GUTTER = 40;
const SIZE = Dimensions.get('window').width / COLUMNS - GUTTER;

const useNativeDriver = true;
const to = (toValue: number) => ({
  toValue,
  useNativeDriver
});

type Cell = {
  image: any,
  animation: any
}

export default class App extends React.Component {
  cells: Cell[];
  background = new Animated.Value(HIDDEN);
  text = new Animated.Value(HIDDEN);
  state: { focused?: Cell } = {};

  constructor(props) {
    super(props);
    this.cells = icons.map((icon) => ({
      ...icon, animation: new Animated.Value(HIDDEN)
    }));
  }

  componentDidMount() {
    this.animateIn();
  }

  toggleFocus(cell) {
    if (cell == this.state.focused) {
      this.unfocus();
    } else if (!this.state.focused) {
      this.focus(cell);
    }
  }

  focus(cellToFocus: Cell) {
    const cells = this.cells.map((cell) =>
      cell === cellToFocus
        ? spring(cell.animation, to(FOCUSED))
        : spring(cell.animation, to(HIDDEN))
    );

    const animationGroup =
      parallel([
        spring(this.background, to(VISIBLE)),
        stagger(20, cells),
        sequence([
          delay(200),
          spring(this.text, to(VISIBLE))
        ])
      ]);

    // set focused elements, then run animations
    this.setState({ focused: cellToFocus }, () => {
      animationGroup.start();
    });
  }

  unfocus() {
    const animations = this.cells.map((cell) =>
      spring(cell.animation, to(VISIBLE))
    );

    // run animations, then unset focused element
    parallel([
      spring(this.background, to(HIDDEN)),
      spring(this.text, to(HIDDEN)),
      stagger(40, animations)
    ]).start(() => {
      this.setState({ focused: null });
    })
  }

  animateIn() {
    const animations = this.cells.map((cell) =>
      spring(cell.animation, to(VISIBLE))
    );

    sequence([
      delay(500),
      stagger(40, animations)
    ]).start();
  }

  render() {
    const { focused } = this.state;
    return (
      <View style={{flex: 1}}>
        <Background color='#eee' visibility={this.background} />
        <Limelight color='white' visibility={this.background} />
        <Title
          text={ focused ? focused.name : '' }
          top={(SIZE + GUTTER) * 2}
          visibility={this.text}
        />
        <Grid
          gutter={GUTTER}
          data={this.cells}
          columns={COLUMNS}
          render={(cell, col, row) => (
            <GridCell
              row={row}
              col={col}
              size={SIZE}
              gutter={GUTTER}
              key={`row-${row}-col-${col}`}
              animation={cell.animation}
            >
              <TouchableWithoutFeedback
                onPress={() => this.toggleFocus(cell)}
              >
                <Image
                  source={cell.image}
                  style={{
                    width: SIZE,
                    height: SIZE
                  }}
                />
              </TouchableWithoutFeedback>
            </GridCell>
          )}
        />
      </View>
    );
  }
}
