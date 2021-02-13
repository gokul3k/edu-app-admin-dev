import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
      display:"flex",
    flexDirection: 'row',
  },
  bulletPoint: {
    width: 12,
    fontSize: 10,
  },
  itemContent: {
    fontSize: 12,
    display:"flex",
    flexDirection:"column"
  },
});

const List = ({ children }) => children;

export const Item = ({ children }) => (
  <View style={styles.item}>
    <Text style={styles.bulletPoint}>•</Text>
    <Text style={styles.itemContent}>{children}</Text>
  </View>
);

export default List;