import React from 'react';

import { Text, View, StyleSheet } from '@react-pdf/renderer';
import List, { Item } from './List'
const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  skill: {
    fontSize: 10,
    flexDirection: 'row',

  },
  title: {
    fontSize: 14,
    fontFamily: 'Fredoka',
    textTransform: "uppercase",
  },
  line: {
    backgroundColor: "#DFDFDF",
    height: 1,
    width: '100%'
  },
  educationBlk: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  educationInBlk1: {
    display: 'flex',
    flexDirection: 'column',
    flex: 2,
    flexWrap: 'wrap'
  },
  educationInBlk2: {
    display: 'flex',
    flexDirection: 'column',
    flex: 4,
    flexWrap: 'wrap'
  }

});

export default ({data}) => (
  <View style={styles.container}>
    <Text style={styles.title}>Skills</Text>
    <View style={styles.line}></View>
    <View style={styles.educationBlk}>
      <View style={styles.educationInBlk1}>
      </View>
      <View style={styles.educationInBlk2}>
        <List>
          {data.map((skill)=>(
            <Item>{skill.Skill}</Item>
          ))}
    
        </List>
      </View>
    </View>
  </View>
);