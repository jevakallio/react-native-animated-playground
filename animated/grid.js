// @flow

import React from 'react';
import {
  View,
  Platform
} from 'react-native';

const top = Platform.OS === 'ios' ? 20 : 0;
type GridPropTypes<T> = {
  data: T[],
  columns: number,
  render: (T, number, number) => React.Element<*>
};

export default ({ render, columns, data }: GridPropTypes<*>) => {
  return (
    <View>
      { data.map((item, i) =>
        render(item, i % columns, Math.floor(i / columns))
      )}
    </View>
  );
}
